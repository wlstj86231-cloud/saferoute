(() => {
  "use strict";
  const form = document.getElementById("request-form");
  if (!form) return;
  const result = document.getElementById("request-result");
  const out = document.getElementById("request-text");
  const flagsEl = document.getElementById("request-flags");
  const status = document.getElementById("request-status");
  const errorBox = document.getElementById("request-error");
  const shareButton = document.getElementById("request-share");

  const LABELS = {
    attachment: { none: "작업기 없음", attached: "작업기를 부착한 채 운송", detached: "작업기를 분리해 함께 운송", unknown: "작업기 부착 여부 미확인" },
    drive: { yes: "시동·자력 주행 가능", no: "시동 또는 주행 불가", unknown: "자력 주행 가능 여부 미확인" },
    access: { large: "대형 화물차 진입 가능", small: "소형 트럭만 진입 가능", hard: "차량 진입 어려움(좁은 농로·급경사 등)", unknown: "진입로 미확인" },
    method: { self: "기계가 직접 올라감(사다리·경사판)", crane: "크레인 필요", forklift: "지게차 필요", site: "현장 장비(지게차·로더 등) 있음", discuss: "업체와 상의 필요" },
    wait: { none: "대기 없음", "30": "30분 이내", "60": "1시간 이내", over: "1시간 넘을 수 있음", unknown: "대기 시간 미확인" },
    time: { any: "시간 무관", am: "오전", pm: "오후", discuss: "시간 협의" }
  };
  const UNIT = { m: 1, cm: 0.01, mm: 0.001 };
  const DIMENSIONS = [
    ["length", "길이(전장)", 0.5, 20],
    ["width", "너비(전폭)", 0.3, 5],
    ["height", "높이(전고)", 0.3, 5]
  ];

  const value = (name) => (form.elements.namedItem(name)?.value || "").trim();
  const fmt = (n, digits = 0) => n.toLocaleString("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  function parseNumber(raw, suffix = /$/) {
    const text = String(raw).replace(/[\s,]/g, "").toLowerCase().replace(suffix, "");
    if (text === "") return null;
    return /^\d+(\.\d+)?$/.test(text) ? Number(text) : NaN;
  }

  // 제원표 값을 단위째 붙여 넣은 경우(3,450mm, 345cm, 3.45m)는 적힌 단위를 따릅니다.
  function parseLength(raw, unit) {
    const text = String(raw).replace(/[\s,]/g, "").toLowerCase();
    const m = text.match(/^(.*?)(mm|cm|m|밀리|센티|미터)$/);
    if (!m) return { raw: parseNumber(text), unit };
    const named = { mm: "mm", cm: "cm", m: "m", 밀리: "mm", 센티: "cm", 미터: "m" }[m[2]];
    return { raw: parseNumber(m[1]), unit: named };
  }

  function parseWeight(raw) {
    const text = String(raw).replace(/[\s,]/g, "").toLowerCase();
    if (text === "") return null;
    const ton = text.match(/^(\d+(?:\.\d+)?)(톤|t)$/);
    if (ton) return Number(ton[1]) * 1000;
    const kg = text.match(/^(\d+(?:\.\d+)?)(kg|킬로|키로)?$/);
    return kg ? Number(kg[1]) : NaN;
  }

  function setError(name, message) {
    const input = form.elements.namedItem(name);
    if (!input) return;
    const box = document.getElementById(`${name}-error`);
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (box) { box.textContent = message; box.hidden = false; }
    } else {
      input.removeAttribute("aria-invalid");
      if (box) { box.textContent = ""; box.hidden = true; }
    }
  }

  function readSpecs(errors) {
    const dims = {};
    for (const [name, title, min, max] of DIMENSIONS) {
      const { raw, unit } = parseLength(value(name), value("dimUnit") || "m");
      setError(name, "");
      if (raw === null) { dims[name] = null; continue; }
      const meters = Number.isNaN(raw) ? NaN : raw * UNIT[unit];
      if (Number.isNaN(meters)) {
        errors.push([name, `${title}는 숫자만 적어 주세요. 예: 3.45`]);
      } else if (meters < min || meters > max) {
        const hint = meters > max
          ? (unit === "m" ? "제원표의 mm 값을 그대로 적었다면 위의 단위를 mm로 바꾸세요." : "단위를 다시 확인하세요.")
          : (unit !== "m" ? "미터로 적었다면 위의 단위를 m로 바꾸세요." : "단위를 다시 확인하세요.");
        errors.push([name, `${title} ${fmt(raw, 2).replace(/\.?0+$/, "")}${unit}는 농기계 치수로 보기 어렵습니다. ${hint}`]);
      } else {
        dims[name] = meters;
      }
    }
    const weight = parseWeight(value("weight"));
    setError("weight", "");
    if (weight !== null) {
      if (Number.isNaN(weight)) errors.push(["weight", "중량은 숫자로 적어 주세요. 예: 2100 또는 2.1톤"]);
      else if (weight < 20) errors.push(["weight", `${fmt(weight)}kg은 너무 가볍습니다. 톤 단위라면 '2.1톤'처럼 적어 주세요.`]);
      else if (weight > 40000) errors.push(["weight", "40,000kg을 넘는 값입니다. 0이 더 붙지 않았는지 확인하세요."]);
    }
    const hp = parseNumber(value("hp"), /(마력|ps|hp)$/);
    setError("hp", "");
    if (hp !== null && (Number.isNaN(hp) || hp < 1 || hp > 1000)) errors.push(["hp", "마력은 1~1000 사이 숫자로 적어 주세요. 모르면 비워 두세요."]);
    return { dims, weight: Number.isNaN(weight) ? null : weight, hp: Number.isNaN(hp) ? null : hp };
  }

  function siteLine(prefix) {
    const parts = [value(`${prefix}Region`)];
    parts.push(`진입로: ${LABELS.access[value(`${prefix}Access`)] || LABELS.access.unknown}`);
    const note = value(`${prefix}Note`);
    if (note) parts.push(note);
    parts.push(`${prefix === "pickup" ? "상차" : "하차"}: ${LABELS.method[value(`${prefix}Method`)] || LABELS.method.discuss}`);
    parts.push(`대기: ${LABELS.wait[value(`${prefix}Wait`)] || LABELS.wait.unknown}`);
    return parts.join(" / ");
  }

  function buildText(specs) {
    const { dims, weight, hp } = specs;
    const show = (m) => (m === null ? "미확인" : `${fmt(m, 2)}m`);
    const machineParts = [value("machine")];
    if (value("model")) machineParts.push(value("model"));
    machineParts.push(hp === null ? "마력 미확인" : `${fmt(hp)}마력`);
    const attachment = value("attachment");
    const attachLine = LABELS.attachment[attachment] + (value("attachmentNote") && attachment !== "none" ? ` (${value("attachmentNote")})` : "");
    const dateParts = [];
    if (value("date")) dateParts.push(value("date"));
    dateParts.push(LABELS.time[value("time")] || LABELS.time.any);
    if (value("flexible") === "yes") dateParts.push("날짜 조정 가능");
    if (value("flexible") === "no") dateParts.push("날짜 조정 어려움");

    const lines = [
      "[농기계 탁송 견적 요청]",
      `■ 기계: ${machineParts.join(" / ")}`,
      `■ 크기: 길이 ${show(dims.length)} · 너비 ${show(dims.width)} · 높이 ${show(dims.height)}`,
      `■ 중량: ${weight === null ? "미확인" : `${fmt(Math.round(weight))}kg`}`,
      `■ 작업기: ${attachLine}`,
      `■ 주행: ${LABELS.drive[value("drive")] || LABELS.drive.unknown}`,
      `■ 출발(상차): ${siteLine("pickup")}`,
      `■ 도착(하차): ${siteLine("drop")}`,
      `■ 희망 일정: ${value("date") ? "" : "날짜 미정 · "}${dateParts.join(" · ")}`
    ];
    if (value("memo")) lines.push(`■ 기타: ${value("memo")}`);
    lines.push(
      "",
      "견적 주실 때 아래 항목을 나누어 적어 주세요.",
      "1) 기본 운임",
      "2) 상차비·하차비 (크레인·지게차 비용 포함 여부)",
      "3) 대기료 (무료 대기 시간과 초과 요금)",
      "4) 통행료·기타 실비 포함 여부",
      "5) 부가세 포함 여부",
      "6) 운송 중 파손 시 보상 기준 (적재물 보험 가입 여부·보상 한도)",
      "7) 추가 요금이 생기는 조건 (대기 초과·장비 추가·일정 변경·취소)",
      "8) 견적 유효기간과 결제 시점"
    );
    const unknown = [dims.length, dims.width, dims.height, weight].some((v) => v === null);
    if (unknown) lines.push("※ 미확인으로 적은 값은 확인되는 대로 다시 알려 드리겠습니다.");
    return lines.join("\n");
  }

  function buildFlags(specs) {
    const flags = [];
    const { dims, weight } = specs;
    const missing = [];
    if (dims.length === null) missing.push("길이");
    if (dims.width === null) missing.push("너비");
    if (dims.height === null) missing.push("높이");
    if (weight === null) missing.push("중량");
    if (value("hp") === "") missing.push("마력");
    if (missing.length) {
      flags.push(["warn", `아직 모르는 값: ${missing.join("·")}. 업체가 차량 크기와 상차 장비를 정하는 데 쓰는 값입니다. 기계 명판이나 취급설명서의 제원표를 보거나 줄자로 재서 채우면 견적이 더 정확해집니다.`]);
    } else {
      flags.push(["ok", "크기·중량·마력을 모두 적었습니다. 업체마다 같은 조건으로 견적을 낼 수 있습니다."]);
    }
    const attachment = value("attachment");
    if (attachment === "attached") flags.push(["warn", "작업기를 부착한 채 보낸다면, 위 길이·높이·중량이 작업기까지 포함한 값인지 다시 확인하세요."]);
    if (attachment === "detached") flags.push(["", "분리한 작업기도 함께 싣는다면 작업기의 크기와 무게를 업체에 따로 알려 주세요."]);
    if (attachment === "unknown") flags.push(["warn", "작업기를 부착한 채 보낼지 정하지 않았습니다. 부착 여부에 따라 길이·높이·중량과 차량이 달라집니다."]);
    const drive = value("drive");
    if (drive === "no") flags.push(["warn", "기계가 스스로 움직이지 못하면 사다리로 올릴 수 없습니다. 크레인·지게차 같은 상차 방법과 비용을 업체에 꼭 확인하세요."]);
    if (drive !== "yes" && (value("pickupMethod") === "self" || value("dropMethod") === "self")) {
      flags.push(["warn", "상하차 방법이 '기계가 직접 올라감'인데 자력 주행이 확인되지 않았습니다. 상차 방법을 다시 정하세요."]);
    }
    if (value("pickupAccess") === "hard" || value("dropAccess") === "hard") {
      flags.push(["warn", "차량이 들어가기 어려운 현장이 있습니다. 농촌진흥청은 논밭 출입로 경사가 15도 이상이면 농기계 전도 위험이 매우 높다고 안내합니다. 기계를 어디까지 옮겨 둘지, 그 길의 경사와 폭을 업체와 미리 정하세요."]);
    }
    if (dims.height !== null) {
      const margin = 4 - dims.height;
      if (margin <= 0) {
        flags.push(["warn", `기계 높이(${fmt(dims.height, 2)}m)만으로 화물자동차 적재 높이 기준인 지상 4m에 닿습니다(도로교통법 시행령 제22조). 분할할 수 없는 화물은 출발지 관할 경찰서장의 허가 대상이 될 수 있으므로 업체와 운송 방법을 먼저 상의하세요.`]);
      } else {
        flags.push(["", `화물자동차의 적재 높이 기준은 지상 4m입니다(도로교통법 시행령 제22조, 고시된 노선은 4.2m). 기계 높이 ${fmt(dims.height, 2)}m를 빼면 적재함 바닥 높이가 ${fmt(margin, 2)}m 이하인 차량이어야 합니다. 업체에 적재함 바닥 높이를 물어보세요.`]);
      }
    }
    if (dims.width !== null && dims.width > 2.5) {
      flags.push(["warn", `너비가 ${fmt(dims.width, 2)}m입니다. 도로법 시행령 제79조는 폭 2.5m를 넘는 차량을 도로관리청이 운행을 제한할 수 있는 차량으로 정합니다. 실은 상태의 폭과 도로관리청 운행허가가 필요한지 업체에 확인하세요.`]);
    }
    const waits = [value("pickupWait"), value("dropWait")];
    if (waits.includes("over") || waits.includes("unknown")) flags.push(["", "대기 시간이 길거나 정해지지 않았다면 대기료가 붙을 수 있습니다. 무료로 기다려 주는 시간과 초과 요금을 견적에서 따로 받으세요."]);
    flags.push(["", "중량은 실제 값으로 알려야 합니다. 도로법 제77조 제3항은 화주가 실은 화물의 중량을 사실과 다르게 알리는 것을 금지합니다."]);
    return flags;
  }

  function render(event) {
    event?.preventDefault();
    errorBox.hidden = true;
    for (const name of ["machine", "pickupRegion", "dropRegion"]) setError(name, "");
    const errors = [];
    if (!value("machine")) errors.push(["machine", "기종을 골라 주세요."]);
    if (!value("pickupRegion")) errors.push(["pickupRegion", "출발 지역을 적어 주세요. 시·군과 읍·면 정도면 충분합니다."]);
    if (!value("dropRegion")) errors.push(["dropRegion", "도착 지역을 적어 주세요."]);
    const specs = readSpecs(errors);
    if (errors.length) {
      for (const [name, message] of errors) setError(name, message);
      errorBox.textContent = `고칠 곳이 ${errors.length}군데 있습니다. 빨간 글씨를 확인해 주세요.`;
      errorBox.hidden = false;
      // 고치기 전에 만든 요청서가 남아 있으면 틀린 내용을 복사할 수 있으므로 숨깁니다.
      result.hidden = true;
      status.textContent = "";
      form.elements.namedItem(errors[0][0])?.focus();
      return;
    }
    out.textContent = buildText(specs);
    flagsEl.replaceChildren(...buildFlags(specs).map(([kind, text]) => {
      const li = document.createElement("li");
      if (kind) li.className = kind;
      li.textContent = text;
      return li;
    }));
    result.hidden = false;
    status.textContent = "요청서를 만들었습니다. 아래 버튼으로 복사해 업체 2~3곳에 같은 내용으로 보내세요.";
    result.scrollIntoView({ block: "start" });
    document.getElementById("request-result-title")?.focus({ preventScroll: true });
  }

  async function copyText(text, statusEl, okMessage) {
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = okMessage;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(out);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      statusEl.textContent = "자동 복사가 막혀 있습니다. 요청서 글이 선택되었으니 길게 눌러 복사하세요.";
    }
  }

  const toggleAttachmentNote = () => {
    const wrap = document.getElementById("attachment-note-field");
    if (wrap) wrap.hidden = value("attachment") === "none";
  };
  form.elements.namedItem("attachment")?.addEventListener("change", toggleAttachmentNote);
  toggleAttachmentNote();

  form.addEventListener("submit", render);
  document.getElementById("request-copy")?.addEventListener("click", () => copyText(out.textContent, status, "복사했습니다. 문자나 카카오톡 입력창에 붙여 넣어 보내세요."));
  document.getElementById("request-print")?.addEventListener("click", () => window.print());
  if (shareButton && typeof navigator.share === "function") {
    shareButton.hidden = false;
    shareButton.addEventListener("click", async () => {
      try { await navigator.share({ text: out.textContent }); status.textContent = "보낼 앱을 선택하세요."; }
      catch { /* 사용자가 공유를 취소함 */ }
    });
  }
  const submit = form.querySelector('button[type="submit"]');
  if (submit) { submit.disabled = false; submit.textContent = "견적 요청서 만들기"; }
})();
