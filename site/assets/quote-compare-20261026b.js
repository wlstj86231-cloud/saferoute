(() => {
  "use strict";
  const form = document.getElementById("quote-form");
  if (!form) return;
  const output = document.getElementById("quote-result");
  const errorBox = document.getElementById("quote-error");

  const COSTS = [
    ["base", "기본 운임", "기본 운임"],
    ["load", "상차비", "상차비(크레인·지게차 등 장비 비용 포함 여부)"],
    ["unload", "하차비", "하차비(장비 비용 포함 여부)"],
    ["wait", "대기료", "대기료(무료로 기다려 주는 시간과 초과 요금)"],
    ["toll", "통행료·기타 실비", "통행료·기타 실비가 운임에 포함되는지"],
    ["attach", "작업기 분리·별도 운송", "작업기 분리·별도 운송 비용(작업기가 없으면 해당 없음)"],
    ["tax", "부가세", "부가세 포함 여부와 금액"]
  ];
  const INSURANCE = {
    "": "미확인",
    written: "문자·서면으로 보상 기준 받음",
    verbal: "말로만 들음",
    none: "보상 없음·고객 부담이라고 함"
  };
  const won = (n) => n.toLocaleString("ko-KR");
  const groups = [...form.querySelectorAll("[data-quote]")];
  const LETTERS = "ABCDE";

  // '포함·없음·무료'는 0원, '모름·별도·미확인'은 빈 칸(미확인)과 같게 봅니다.
  const ZERO_WORDS = new Set(["포함", "없음", "무료", "해당없음"]);
  const BLANK_WORDS = new Set(["모름", "미확인", "별도", "?"]);

  // 만 아래 자리: 5000, 5천, 5천500, 3백5십, 1.2백 등. 단위 앞 숫자가 없으면 1로 봅니다(천 = 1천).
  // 단위 없는 끝자리 숫자의 소수점은 '35.5만'처럼 만 앞에서만 받습니다.
  function parseBelowMan(text, allowDecimal) {
    if (text === "") return 0;
    const m = text.match(/^(?:(\d*(?:\.\d+)?)천)?(?:(\d*(?:\.\d+)?)백)?(?:(\d*(?:\.\d+)?)십)?(\d+(?:\.\d+)?)?$/);
    if (!m || (!allowDecimal && m[4]?.includes("."))) return NaN;
    let total = m[4] ? Number(m[4]) : 0;
    for (const [digits, unit] of [[m[1], 1000], [m[2], 100], [m[3], 10]]) {
      if (digits !== undefined) total += (digits === "" ? 1 : Number(digits)) * unit;
    }
    return total;
  }

  function parseWon(raw) {
    const text = String(raw)
      .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
      .replace(/[\s,₩￦]/g, "")
      .replace(/원(정)?$/, "");
    if (text === "" || BLANK_WORDS.has(text)) return null;
    if (ZERO_WORDS.has(text)) return 0;
    const at = text.indexOf("만");
    if (at === -1) return Math.round(parseBelowMan(text, false));
    const rest = text.slice(at + 1);
    // 만 뒤에 단위 없이 숫자만 오면 네 자리(35만5000)만 받습니다. '35만5'처럼 뜻이 애매한 값은 다시 묻습니다.
    if (/^\d+$/.test(rest) && rest.length !== 4) return NaN;
    return Math.round((at === 0 ? 1 : parseBelowMan(text.slice(0, at), true)) * 10000 + parseBelowMan(rest, false));
  }

  function invalidMessage(raw) {
    if (/^\s*-/.test(raw)) return "음수는 적을 수 없습니다. 할인을 받았다면 할인된 금액을 적어 주세요.";
    return "숫자로 적어 주세요. 예: 350000, 35만, 35만5천 (포함이면 0, 모르면 비움)";
  }

  function fieldOf(group, name) { return group.querySelector(`[name="${name}"]`); }

  function setError(input, message) {
    const id = `${input.id}-error`;
    let box = document.getElementById(id);
    if (message) {
      if (!box) {
        box = document.createElement("span");
        box.id = id;
        box.className = "field-error";
        input.insertAdjacentElement("afterend", box);
      }
      box.textContent = message;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", id);
    } else {
      box?.remove();
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  }

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function readQuotes(errors) {
    return groups.map((group, index) => {
      const costs = COSTS.map(([key, title, ask]) => {
        const input = fieldOf(group, key);
        const parsed = parseWon(input.value);
        setError(input, "");
        if (Number.isNaN(parsed)) {
          errors.push(input);
          setError(input, invalidMessage(input.value));
          return { key, title, ask, value: null, invalid: true };
        }
        if (parsed !== null && parsed > 999999999) {
          errors.push(input);
          setError(input, "10억 원 미만으로 적어 주세요.");
          return { key, title, ask, value: null, invalid: true };
        }
        return { key, title, ask, value: parsed };
      });
      const quotedAt = fieldOf(group, "quotedAt").value;
      const validInput = fieldOf(group, "validUntil");
      setError(validInput, "");
      if (quotedAt && validInput.value && validInput.value < quotedAt) {
        errors.push(validInput);
        setError(validInput, "유효기한이 견적 받은 날보다 앞섭니다. 날짜를 확인하세요.");
      }
      const insurance = fieldOf(group, "insurance").value;
      const extra = fieldOf(group, "extra").value.trim();
      const active = costs.some((c) => c.value !== null || c.invalid) || insurance !== "" || extra !== "";
      const known = costs.filter((c) => c.value !== null);
      return {
        letter: LETTERS[index],
        name: fieldOf(group, "label").value.trim() || `견적 ${LETTERS[index]}`,
        quotedAt,
        validUntil: validInput.value,
        basis: fieldOf(group, "basis").value.trim(),
        insurance,
        insuranceNote: fieldOf(group, "insuranceNote").value.trim(),
        extra,
        costs,
        missing: costs.filter((c) => c.value === null),
        total: known.reduce((sum, c) => sum + c.value, 0),
        active
      };
    });
  }

  function questionsFor(q) {
    const list = q.missing.map((c) => c.ask);
    if (q.insurance !== "written") list.push("운송 중 파손 시 보상 기준(적재물 보험 가입 여부·보상 한도)을 문자로");
    if (!q.extra) list.push("추가 요금이 생기는 조건(대기 초과·장비 추가·일정 변경·취소)");
    if (!q.validUntil) list.push("견적 유효기간과 결제 시점");
    return list;
  }

  function summarize(quotes) {
    const lines = [];
    const complete = quotes.filter((q) => q.missing.length === 0).sort((a, b) => a.total - b.total);
    const partial = quotes.filter((q) => q.missing.length > 0);
    if (quotes.length === 1) lines.push(["warn", "견적이 한 곳뿐입니다. 같은 견적 요청서를 다른 업체 1~2곳에도 보내면 금액과 조건을 비교할 수 있습니다."]);
    if (complete.length) {
      const best = complete[0];
      let text = `모든 비용 항목이 확인된 견적: ${complete.map((q) => q.name).join(", ")}. `;
      if (complete.length > 1) {
        const next = complete[1];
        text += best.total === next.total
          ? `${best.name}와 ${next.name}의 확인된 합계가 ${won(best.total)}원으로 같습니다.`
          : `이 중 합계가 가장 낮은 곳은 ${best.name}(${won(best.total)}원)이고, 다음인 ${next.name}보다 ${won(next.total - best.total)}원 낮습니다.`;
      } else {
        text += `${best.name}의 합계는 ${won(best.total)}원입니다.`;
      }
      lines.push(["ok", text]);
    } else if (quotes.length) {
      lines.push(["warn", "모든 비용 항목이 확인된 견적이 아직 없습니다. 지금 합계는 빠진 비용을 뺀 금액이라 실제로 내는 돈보다 적을 수 있습니다. 아래 질문을 먼저 보내세요."]);
    }
    for (const q of partial) {
      let text = `${q.name}: ${q.missing.map((c) => c.title).join(", ")} 미확인. 확인된 금액만 더하면 ${won(q.total)}원이며 실제 금액은 이보다 늘어날 수 있습니다.`;
      if (complete.length && q.total > complete[0].total) text += ` 확인된 금액만으로도 ${complete[0].name}보다 ${won(q.total - complete[0].total)}원 높습니다.`;
      lines.push(["warn", text]);
    }
    const riskyInsurance = quotes.filter((q) => q.insurance !== "written");
    if (riskyInsurance.length) {
      lines.push(["warn", `파손 보상 기준을 문서로 받지 않은 견적: ${riskyInsurance.map((q) => `${q.name}(${INSURANCE[q.insurance]})`).join(", ")}. 금액이 낮아도 운송 중 파손되면 누가 어떻게 보상하는지 문자로 받아 두세요.`]);
    }
    const noExtra = quotes.filter((q) => !q.extra);
    if (noExtra.length) lines.push(["", `추가 요금 조건을 받지 않은 견적: ${noExtra.map((q) => q.name).join(", ")}. 대기 초과, 크레인 추가, 일정 변경·취소 때 요금이 붙는지 물어보세요.`]);
    const now = today();
    for (const q of quotes) {
      if (q.costs[0].value === 0) lines.push(["warn", `${q.name}의 기본 운임이 0원입니다. 총액만 들었다면 총액을 기본 운임 칸에 적고, 그 안에 포함된 항목에 0을 적으세요.`]);
      if (q.validUntil && q.validUntil < now) lines.push(["warn", `${q.name}의 견적 유효기한(${q.validUntil})이 지났습니다. 금액이 그대로인지 다시 확인하세요.`]);
      if (q.total > 10000000) lines.push(["warn", `${q.name}의 합계가 1천만 원을 넘습니다. 금액에 0이 더 붙지 않았는지 확인하세요.`]);
    }
    return lines;
  }

  function el(tag, attrs = {}, text) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function buildTable(quotes) {
    const wrap = el("div", { class: "cmp-wrap" });
    wrap.append(el("p", { class: "hint" }, "단위: 원 · '포함·없음'은 0원으로 적은 항목 · 노란 칸은 확인이 필요한 항목"));
    const table = el("table", { class: "cmp" });
    const head = el("tr");
    head.append(el("th", { scope: "col" }, "항목"));
    for (const q of quotes) head.append(el("th", { scope: "col" }, q.name));
    const thead = el("thead");
    thead.append(head);
    table.append(thead);
    const body = el("tbody");
    const complete = quotes.filter((q) => q.missing.length === 0);
    const bestTotal = complete.length > 1 ? Math.min(...complete.map((q) => q.total)) : null;
    for (const [i, [, title]] of COSTS.entries()) {
      const row = el("tr");
      row.append(el("th", { scope: "row" }, title));
      for (const q of quotes) {
        const v = q.costs[i].value;
        row.append(v === null ? el("td", { class: "missing" }, "미확인") : el("td", {}, v === 0 ? "포함·없음" : won(v)));
      }
      body.append(row);
    }
    const total = el("tr", { class: "total" });
    total.append(el("th", { scope: "row" }, "확인된 합계"));
    for (const q of quotes) {
      const cls = bestTotal !== null && q.missing.length === 0 && q.total === bestTotal ? "best" : "";
      const cell = el("td", cls ? { class: cls } : {}, won(q.total));
      if (q.missing.length) cell.append(el("br"), el("small", {}, "+ 미확인"));
      total.append(cell);
    }
    body.append(total);
    const rows = [
      ["미확인 항목", (q) => (q.missing.length ? `${q.missing.length}개` : "없음"), (q) => (q.missing.length ? "missing" : "")],
      ["파손 보상", (q) => INSURANCE[q.insurance] + (q.insuranceNote ? ` · ${q.insuranceNote}` : ""), (q) => (q.insurance === "written" ? "text" : "text missing")],
      ["추가 요금 조건", (q) => q.extra || "받지 않음", (q) => (q.extra ? "text" : "text missing")],
      ["유효기한", (q) => q.validUntil || "미확인", (q) => (q.validUntil ? "text" : "text missing")],
      ["근거 메모", (q) => q.basis || "-", () => "text"]
    ];
    for (const [title, getText, getClass] of rows) {
      const row = el("tr");
      row.append(el("th", { scope: "row" }, title));
      for (const q of quotes) {
        const cls = getClass(q);
        row.append(el("td", cls ? { class: cls } : {}, getText(q)));
      }
      body.append(row);
    }
    table.append(body);
    wrap.append(table);
    return wrap;
  }

  function quoteToText(q) {
    const lines = [`■ ${q.name} (견적일 ${q.quotedAt || "-"}, 유효기한 ${q.validUntil || "미확인"})`];
    lines.push(q.costs.map((c) => `${c.title} ${c.value === null ? "미확인" : `${won(c.value)}원`}`).join(" / "));
    lines.push(`확인된 합계 ${won(q.total)}원${q.missing.length ? ` (미확인 ${q.missing.length}개: ${q.missing.map((c) => c.title).join(", ")})` : " (미확인 없음)"}`);
    lines.push(`파손 보상: ${INSURANCE[q.insurance]}${q.insuranceNote ? ` · ${q.insuranceNote}` : ""}`);
    lines.push(`추가 요금 조건: ${q.extra || "받지 않음"}`);
    if (q.basis) lines.push(`근거: ${q.basis}`);
    return lines.join("\n");
  }

  function askText(q) {
    return [
      "안녕하세요. 농기계 탁송 견적 보내 주셔서 감사합니다.",
      "다른 견적과 같은 기준으로 비교하려고 합니다. 아래 항목을 문자로 알려 주시겠어요?",
      ...questionsFor(q).map((item) => `- ${item}`)
    ].join("\n");
  }

  async function copy(text, statusEl) {
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "복사했습니다. 문자나 카카오톡에 붙여 넣으세요.";
    } catch {
      statusEl.textContent = "자동 복사가 막혀 있습니다. 글을 길게 눌러 선택한 뒤 복사하세요.";
    }
  }

  let lastText = "";

  function render() {
    errorBox.hidden = true;
    const errors = [];
    const quotes = readQuotes(errors).filter((q) => q.active);
    if (errors.length) {
      errorBox.textContent = `고칠 곳이 ${errors.length}군데 있습니다. 빨간 글씨를 확인해 주세요.`;
      errorBox.hidden = false;
      // 고치기 전의 결과가 남아 있으면 틀린 표를 복사할 수 있으므로 지웁니다.
      output.replaceChildren(el("p", {}, "빨간 글씨를 고친 뒤 '견적 비교하기'를 다시 누르세요."));
      lastText = "";
      errors[0].focus();
      return false;
    }
    output.replaceChildren();
    if (!quotes.length) {
      output.append(el("p", { class: "form-error" }, "비교할 견적이 없습니다. 받은 견적의 금액을 하나 이상 적어 주세요."));
      lastText = "";
      return false;
    }
    output.append(el("h2", { id: "quote-result-title", tabindex: "-1" }, "비교 결과"));
    const flags = el("ul", { class: "flags" });
    const summary = summarize(quotes);
    for (const [kind, text] of summary) flags.append(el("li", kind ? { class: kind } : {}, text));
    output.append(flags, buildTable(quotes));

    const askable = quotes.filter((q) => questionsFor(q).length);
    if (askable.length) {
      output.append(el("h2", {}, "업체에 다시 물어볼 내용"));
      output.append(el("p", {}, "빠진 항목만 골라 만든 문자입니다. 복사해서 해당 업체에 보내고, 답을 받으면 위 칸을 채워 다시 비교하세요."));
      for (const q of askable) {
        const block = el("div", { class: "ask-block" });
        const text = askText(q);
        const status = el("p", { class: "status", role: "status" });
        const button = el("button", { type: "button", class: "btn btn-secondary" }, `${q.name}에 보낼 문자 복사`);
        button.addEventListener("click", () => copy(text, status));
        block.append(el("h3", {}, q.name), el("pre", { class: "out-text" }, text), button, status);
        output.append(block);
      }
    } else {
      output.append(el("p", { class: "note" }, "모든 견적에서 비용·보상·추가 요금 조건을 받았습니다. 결정하기 전에 견적 내용을 문자나 서면으로 남겨 두세요."));
    }
    const stamp = `작성 ${new Date().toLocaleString("ko-KR")} · 계산: 비용 7개 항목의 단순 합계(미확인 항목 제외). 운송 적합성·보험 보장·업체 자격은 판정하지 않습니다. 도구: ${location.origin}${location.pathname}`;
    output.append(el("p", { class: "meta-line" }, stamp));
    lastText = ["[농기계 탁송 견적 비교]", ...summary.map(([, t]) => `· ${t}`), "", ...quotes.map(quoteToText), "", stamp].join("\n");
    return true;
  }

  for (const group of groups) {
    for (const [key] of COSTS) {
      const input = fieldOf(group, key);
      input.addEventListener("blur", () => {
        const parsed = parseWon(input.value);
        if (parsed !== null && !Number.isNaN(parsed) && parsed <= 999999999) {
          input.value = won(parsed);
          setError(input, "");
        }
      });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (render()) {
      output.scrollIntoView({ block: "start" });
      document.getElementById("quote-result-title")?.focus({ preventScroll: true });
    }
  });
  const pageStatus = document.getElementById("quote-status");
  document.getElementById("quote-copy")?.addEventListener("click", () => {
    if (render() && lastText) copy(lastText, pageStatus);
  });
  document.getElementById("quote-print")?.addEventListener("click", () => { if (render()) window.print(); });
  document.getElementById("quote-reset")?.addEventListener("click", () => {
    if (!window.confirm("입력한 견적을 모두 지울까요?")) return;
    form.reset();
    for (const input of form.querySelectorAll("[aria-invalid]")) setError(input, "");
    output.replaceChildren(el("p", {}, "금액을 입력한 뒤 '견적 비교하기'를 누르세요."));
    errorBox.hidden = true;
    pageStatus.textContent = "";
  });
  const submit = form.querySelector('button[type="submit"]');
  if (submit) { submit.disabled = false; submit.textContent = "견적 비교하기"; }
})();
