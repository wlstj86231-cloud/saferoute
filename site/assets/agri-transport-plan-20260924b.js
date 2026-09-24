const form = document.getElementById("transport-plan-form");
const result = document.getElementById("transport-plan-result");
const output = document.getElementById("transport-plan-text");
const status = document.getElementById("transport-plan-status");

const attachmentLabels = {
  unknown: "확인 전",
  attached: "작업기 장착 상태",
  detached: "작업기 분리·별도 운송",
  none: "작업기 없음"
};
const loadingLabels = {
  unknown: "확인 전",
  yes: "현장 확인한 자력 이동 가능 상태",
  no: "자력 상차 불가 또는 불안정"
};

function measure(value, unit) {
  return value ? `${value}${unit}` : "미확인 — 제원·실측 확인 필요";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const attachment = data.get("attachment");
  const selfLoading = data.get("selfLoading");
  const checks = [
    "출발·도착지 진입로 폭, 경사, 회차·상하차 공간 확인",
    "차량 적재·고정·상하차 방법을 운송업체가 현장에서 판단",
    "상차/운송/하차/대기/통행료/파손 처리 범위를 견적에 분리 기재",
    "인수 전후 상태와 작업기·부속품 사진, 인계 시간 기록"
  ];
  if (attachment === "attached") checks.unshift("작업기를 장착한 전체 크기와 중량 재확인");
  if (attachment === "detached") checks.unshift("분리한 작업기의 개수·크기·고정 방법을 별도로 확인");
  if (selfLoading !== "yes") checks.unshift("별도 상차 장비와 담당자, 현장 작업 가능 여부 확인");
  const text = [
    "[농기계 탁송 현장 확인표 — 문의용]",
    `기계: ${data.get("machine")}`,
    `출발: ${data.get("pickup")}`,
    `도착: ${data.get("dropoff")}`,
    `전체 길이: ${measure(data.get("length"), "m")}`,
    `전체 너비: ${measure(data.get("width"), "m")}`,
    `전체 높이: ${measure(data.get("height"), "m")}`,
    `전체 중량: ${measure(data.get("weight"), "kg")}`,
    `작업기: ${attachmentLabels[attachment]}`,
    `자력 이동: ${loadingLabels[selfLoading]}`,
    "",
    "운송업체와 함께 확인할 항목:",
    ...checks.map((item, index) => `${index + 1}. ${item}`),
    "",
    "이 메모는 안전 승인·통행 가능 판정·확정 견적이 아닙니다."
  ].join("\n");
  output.textContent = text;
  result.hidden = false;
  status.textContent = "확인표를 만들었습니다. 입력 내용은 서버에 저장되지 않습니다.";
});

document.getElementById("transport-plan-copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    status.textContent = "확인표를 복사했습니다.";
  } catch {
    status.textContent = "자동 복사에 실패했습니다. 확인표를 선택해 직접 복사해 주세요.";
  }
});
document.getElementById("transport-plan-print").addEventListener("click", () => window.print());
const submitButton = form.querySelector('button[type="submit"]');
submitButton.textContent = "확인표 만들기";
submitButton.disabled = false;
