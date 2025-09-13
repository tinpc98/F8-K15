const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const status = document.getElementById("status");

const startBtn = document.getElementById("startCamera");
const stopBtn = document.getElementById("stopCamera");
const takePhotoBtn = document.getElementById("takePhoto");
const downloadBtn = document.getElementById("downloadPhoto");

let stream = null; // Lưu stream camera để dừng khi cần

// 1. Start Camera
startBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    status.textContent = "✅ Camera started";
    status.style.color = "green";
  } catch (err) {
    status.textContent = "❌ Không thể bật camera: " + err;
    status.style.color = "red";
  }
});

// 2. Stop Camera
stopBtn.addEventListener("click", () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop()); // Dừng tất cả tracks
    video.srcObject = null;
    status.textContent = "⛔ Camera stopped";
    status.style.color = "orange";
  }
});

// 3. Take Photo
takePhotoBtn.addEventListener("click", () => {
  if (!stream) {
    status.textContent = "⚠️ Camera chưa bật!";
    status.style.color = "red";
    return;
  }

  // Đặt kích thước canvas bằng video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Chuyển canvas thành ảnh và hiển thị
  const imageData = canvas.toDataURL("image/png");
  photo.src = imageData;
  status.textContent = "📸 Đã chụp ảnh!";
  status.style.color = "blue";
});

// 4. Download Photo
downloadBtn.addEventListener("click", () => {
  if (!photo.src) {
    status.textContent = "⚠️ Chưa có ảnh để tải!";
    status.style.color = "red";
    return;
  }

  const link = document.createElement("a");
  link.download = "photo.png"; // Tên file tải về
  link.href = photo.src; // Lấy ảnh từ thẻ <img>
  link.click();
  status.textContent = "⬇️ Ảnh đã được tải về!";
  status.style.color = "green";
});
