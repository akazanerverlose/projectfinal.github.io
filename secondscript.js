document
  .getElementById("propertyImage")
  .addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("previewImage").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
const Form = document.getElementById("listingForm");

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingModal.show();
  document.getElementById("loadingSpinner").style.display = "block";
  document.getElementById("loadingTick").style.display = "none";

  setTimeout(() => {
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("loadingTick").style.display = "block";

    setTimeout(() => {
      loadingModal.hide();
      form.reset();
      document.getElementById("previewImage").src = "";
    }, 2000);
  }, 1000);
});
// localStorage element with JSON :
const form = document.getElementById("listingForm");
const tableBody = document.getElementById("listingTable");
let listings = JSON.parse(localStorage.getItem("listings")) || [];
function saveToLocalStorage() {
  localStorage.setItem("listings", JSON.stringify(listings));
}
// information function when it already input :
function renderListings() {
  tableBody.innerHTML = "";
  listings.forEach((listing, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${index + 1}</td>
  <td><img src="${
    listing.image
  }" alt="Property Image" style="width: 100px;  border-radius: 5px; height: auto;" /></td>
  <td>${listing.propertyName}</td>
  <td>${listing.location}</td>
  <td>$${listing.price.toLocaleString()}</td>
  <td>
    <button class="btn btn-info btn-sm" onclick="viewListing(${index})">ចុចមើល</button>
    <button class="btn btn-warning btn-sm" onclick="editListing(${index})">កែសម្រួល</button>
    <button class="btn btn-danger btn-sm" onclick="deleteListing(${index})">លុបទិន្នន័យ</button>
  </td>
`;
    tableBody.appendChild(row);
  });
}
// view function :
function viewListing(index) {
  const listing = listings[index];
  document.getElementById("modalImage").src = listing.image;
  document.getElementById(
    "modalPropertyName"
  ).textContent = ` ប្រភេទផ្ទះ : ${listing.propertyName}`;
  document.getElementById(
    "modalLocation"
  ).textContent = ` ទីតាំង : ${listing.location}`;
  document.getElementById(
    "modalPrice"
  ).textContent = ` តម្លៃផ្ទះ​​ : $${listing.price.toLocaleString()}`;

  const modal = new bootstrap.Modal(document.getElementById("propertyModal"));
  modal.show();
}
// edit function :
function editListing(index) {
  const listing = listings[index];
  document.getElementById("propertyName").value = listing.propertyName;
  document.getElementById("location").value = listing.location;
  document.getElementById("price").value = listing.price;
  listings.splice(index, 1);
  saveToLocalStorage();
  renderListings();
}
// delete function :
function deleteListing(index) {
  listings.splice(index, 1);
  saveToLocalStorage();
  renderListings();
}
// popup function :
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const propertyName = document.getElementById("propertyName").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const propertyImageInput = document.getElementById("propertyImage");
  const file = propertyImageInput.files[0];

  if (!file) {
    alert("Please upload an image!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageBase64 = e.target.result;

    const newListing = {
      propertyName,
      location,
      price: parseFloat(price),
      image: imageBase64,
    };

    listings.push(newListing);
    saveToLocalStorage();
    renderListings();

    const successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    successModal.show();
    form.reset();
  };

  reader.readAsDataURL(file);
});
renderListings();
// search function :
const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#listingTable tr");

    rows.forEach((row) => {
      const propertyType = row.querySelector("td:nth-child(3)")?.textContent.toLowerCase();
      const location = row.querySelector("td:nth-child(4)")?.textContent.toLowerCase();

      if (propertyType?.includes(filter) || location?.includes(filter)) {
        row.style.display = ""
      } else {
        row.style.display = "none";
      }
    });
  });
// login function :
if(sessionStorage.getItem("IsLoginSuccesses") != "true"){
  window.location.href = 'Index.html'
}
else{
  return
}



