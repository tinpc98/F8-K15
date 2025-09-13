// Lấy các phần tử DOM cần dùng
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Hàm thêm công việc
function addTodo() {
  const task = input.value.trim(); // lấy giá trị trong ô input, bỏ khoảng trắng 2 đầu

  if (task === "") {
    alert("Please enter a task!");
    return; // không làm gì nếu input rỗng
  }

  // Tạo thẻ <li>
  const li = document.createElement("li");
  li.textContent = task;

  // Tạo nút Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  // Gắn sự kiện xóa cho nút
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(li); // xóa phần tử <li> khỏi danh sách
  });

  // Thêm nút Delete vào <li>
  li.appendChild(deleteBtn);

  // Thêm <li> vào danh sách
  todoList.appendChild(li);

  // Xóa nội dung input để sẵn sàng nhập công việc mới
  input.value = "";
}

// Gắn sự kiện cho nút Add
addBtn.addEventListener("click", addTodo);

// Cho phép nhấn Enter để thêm công việc
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
