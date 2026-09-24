const form = document.querySelector("#quote-form");
const output = document.querySelector("#quote-result");
const fields = [
  ["base", "기본 운임"],
  ["load", "상차 비용"],
  ["unload", "하차 비용"],
  ["wait", "대기·통행료"],
  ["tax", "부가세"]
];
const won = new Intl.NumberFormat("ko-KR");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  output.replaceChildren();
  let filled = 0;
  for (const [index, group] of [...form.querySelectorAll("[data-quote]")].entries()) {
    const values = fields.map(([name, title]) => {
      const raw = group.elements.namedItem(name).value.trim();
      if (raw === "") return { title, value: null };
      const value = Number(raw);
      if (!Number.isSafeInteger(value) || value < 0 || value > 999999999) return { title, value: null, invalid: true };
      return { title, value };
    });
    if (values.every(({ value }) => value === null)) continue;
    filled++;
    const article = document.createElement("article");
    const name = group.elements.namedItem("label").value.trim() || `견적 ${"ABC"[index]}`;
    const heading = document.createElement("h2");
    heading.textContent = name;
    article.append(heading);
    const invalid = values.filter(({ invalid }) => invalid);
    if (invalid.length) {
      const error = document.createElement("p");
      error.textContent = "음수, 소수 또는 10억 원 이상의 입력값이 있습니다. 견적서의 원 단위 금액을 다시 확인하세요.";
      article.append(error);
      output.append(article);
      continue;
    }
    const known = values.filter(({ value }) => value !== null);
    const missing = values.filter(({ value }) => value === null);
    const total = known.reduce((sum, { value }) => sum + value, 0);
    const amount = document.createElement("strong");
    amount.textContent = `${missing.length ? "입력 금액 합계" : "항목별 금액 합계"}: ${won.format(total)}원`;
    article.append(amount);
    const note = document.createElement("p");
    note.textContent = missing.length
      ? `미확인 ${missing.length}항목: ${missing.map(({ title }) => title).join(", ")}. 이 금액을 확정 총액으로 비교하지 마세요.`
      : "입력한 다섯 항목이 모두 채워졌습니다. 계약서에 별도 비용이 있는지 확인하세요.";
    article.append(note);
    const list = document.createElement("ul");
    for (const { title, value } of values) {
      const item = document.createElement("li");
      item.textContent = `${title}: ${value === null ? "미확인" : `${won.format(value)}원`}`;
      list.append(item);
    }
    article.append(list);
    output.append(article);
  }
  if (!filled) {
    const empty = document.createElement("p");
    empty.textContent = "비교할 견적 금액이 없습니다. 견적서에 적힌 항목을 하나 이상 입력하세요.";
    output.append(empty);
  }
});
