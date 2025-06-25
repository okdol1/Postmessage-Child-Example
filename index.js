const allowedOrigins = ["https://eunbinyeon.com", "https://www.eunbinyeon.com"];

// 부모로부터 메시지 수신
window.addEventListener("message", (event) => {
  if (!allowedOrigins.includes(event.origin)) return;

  if (event.data.type === "DISPLAY_MESSAGE") {
    const display = document.getElementById("messageDisplay");
    display.innerHTML = `<p><strong>수신:</strong> ${JSON.stringify(
      event.data
    )}</p>`;
  }
});

// 메시지 전송 함수
function postToParent(message) {
  const originInput = document.getElementById("originInput");
  const origin = originInput.value.trim();

  if (!origin || !allowedOrigins.includes(origin)) {
    return alert(`유효한 부모 origin을 입력하세요. origin: ${origin}`);
  }

  console.log(
    `[${window.location.origin} =====> ${origin}] ${JSON.stringify(message)}`
  );
  window.parent.postMessage(message, origin);
}

document.getElementById("scrollTopBtn").addEventListener("click", () => {
  postToParent({
    type: "SCROLL_TOP",
    message: "자식 웹에서 보낸 스크롤 최상단 액션 요청",
  });
});

document.getElementById("backBtn").addEventListener("click", () => {
  postToParent({ type: "GO_BACK" });
});
