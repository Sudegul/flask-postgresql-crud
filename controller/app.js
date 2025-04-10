document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const tableBody = document.querySelector("#userTable tbody");
  const clearButton = document.getElementById("clearAll");
  const recordCount = document.getElementById("recordCount");
  const searchInput = document.getElementById("searchInput");

  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Sayfa yüklenince verileri göster
  storedUsers.forEach((user, index) => {
    addRowToTable(user, index);
  });
  updateRecordCount();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name && email) {
      const newUser = { name, email, phone };
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      addRowToTable(newUser, storedUsers.length - 1);
      updateRecordCount();
      form.reset();
    } else {
      alert("Ad ve e-posta zorunludur.");
    }
  });

  clearButton.addEventListener("click", () => {
    if (confirm("Tüm kayıtları silmek istediğinize emin misiniz?")) {
      localStorage.removeItem("users");
      storedUsers = [];
      tableBody.innerHTML = "";
      updateRecordCount();
    }
  });

  function addRowToTable(user, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td><button class="delete-btn" data-index="${index}">Sil</button></td>
    `;
    tableBody.appendChild(row);
  }

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      storedUsers.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      tableBody.innerHTML = "";
      storedUsers.forEach((user, i) => addRowToTable(user, i));
      updateRecordCount();
    }
  });

  function updateRecordCount() {
    recordCount.textContent = `Toplam ${storedUsers.length} kayıt`;
  }

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const rows = document.querySelectorAll("#userTable tbody tr");

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(value) ? "" : "none";
    });
  });
});
