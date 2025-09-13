// Danh sách các thuộc tính cần hiển thị
const properties = [
  "href",
  "protocol",
  "hostname",
  "port",
  "pathname",
  "search",
  "hash",
  "origin",
];

const tableBody = document.getElementById("location-table");

properties.forEach((prop) => {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.className = "prop-name";
  nameCell.textContent = `location.${prop}`;

  const valueCell = document.createElement("td");
  valueCell.className = "prop-value";
  valueCell.textContent = window.location[prop];

  row.appendChild(nameCell);
  row.appendChild(valueCell);

  tableBody.appendChild(row);
});
