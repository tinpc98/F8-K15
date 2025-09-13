// Lấy các phần tử DOM
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const copyText = document.getElementById("copyText");
const pasteText = document.getElementById("pasteText");
const status = document.getElementById("status");

// 1. Copy nội dung từ textarea vào clipboard
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyText.value);
    status.textContent = "✅ Đã copy vào clipboard!";
    status.style.color = "green";
  } catch (err) {
    status.textContent = "❌ Lỗi khi copy: " + err;
    status.style.color = "red";
  }
});

// 2. Paste nội dung từ clipboard ra textarea
pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    pasteText.value = text;
    status.textContent = "📥 Đã paste từ clipboard!";
    status.style.color = "blue";
  } catch (err) {
    status.textContent = "❌ Lỗi khi paste: " + err;
    status.style.color = "red";
  }
});
