document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const tableBody = document.querySelector("#userTable tbody");
  const recordCount = document.getElementById("recordCount");

  // Listeleme fonksiyonu
  function fetchUsers() {
    fetch("http://localhost:5000/list")
      .then((res) => res.json())
      .then((data) => {
        tableBody.innerHTML = "";
        data.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          `;
          tableBody.appendChild(row);
        });
        recordCount.textContent = `Toplam ${data.length} kayıt`;
      });
  }

  fetchUsers(); // Sayfa yüklenince verileri çek

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name && email) {
      const user = { name, email, phone };

      fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Ekleme sonucu:", data);
          form.reset();
          fetchUsers(); // Kayıttan sonra listeyi güncelle
        });
    } else {
      alert("Ad ve e-posta zorunludur.");
    }
  });
});
