// 1. Định nghĩa nội dung cho từng "page"
const pages = {
  home: "Chào mừng đến với trang chủ! Đây là nội dung của trang Home.",
  about:
    "Thông tin về chúng tôi. Chúng tôi là công ty chuyên về công nghệ web.",
  services:
    "Các dịch vụ của chúng tôi: Thiết kế web, Lập trình ứng dụng, Tư vấn công nghệ.",
  contact:
    "Liên hệ với chúng tôi: Email: contact@example.com, Phone: 0123456789",
};

const content = document.getElementById("content");
const historyInfo = document.getElementById("history-info");

// 2. Hàm render nội dung theo page
function renderPage(page) {
  content.textContent = pages[page] || "404 - Page not found";
  historyInfo.textContent = `History Length: ${history.length}`;
}

// 3. Khi click menu → pushState + render
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn browser reload
    const page = link.dataset.page;
    const url = link.getAttribute("href");

    history.pushState({ page }, "", url); // Thay đổi URL
    renderPage(page);
  });
});

// 4. Khi nhấn Back/Forward → popstate
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home"; // Nếu null → về Home
  renderPage(page);
});

// 5. Khi load lại (F5) → đọc URL và render đúng page
function initPage() {
  const path = window.location.pathname.replace("/", "");
  const page = path || "home"; // Nếu URL "/" thì mặc định home
  history.replaceState({ page }, "", `/${page}`); // Lưu state ban đầu
  renderPage(page);
}

initPage();
