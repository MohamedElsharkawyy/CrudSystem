var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var searchInput = document.getElementById("searchinput");
var product_list = [];
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var indexUpdate = 0;

if (localStorage.getItem("product") != null) {
  product_list = JSON.parse(localStorage.getItem("product"));
  display();
}

function addProduct() {
  if (validName() && validPrice() && validCategory() && validDesc()) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      Description: productDescriptionInput.value,
    };
    product_list.push(product);
    localStorage.setItem("product", JSON.stringify(product_list));
    display();
    clearForm();
    productNameInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
  }
}

function clearForm() {

  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function display() {
  var cartona = "";
  for (var i = 0; i < product_list.length; i++) {
    cartona += ` <tr>
    <td> ${i}</td>
    <td> ${product_list[i].name}</td>
    <td>  ${product_list[i].price}</td>
    <td> ${product_list[i].category}</td>
    <td>  ${product_list[i].Description}</td>
    <td>
    <button class="btn btn-sm bg-primary " onclick=" setdata(${i})"> update</button>
    <button class="btn btn-sm bg-danger " onclick=" deleteitem(${i})"> delete</button>
    </td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function search() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < product_list.length; i++) {
    if (product_list[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<tr>
        <td>${i}</td>
        <td>${product_list[i].name}</td>
        <td>${product_list[i].price}</td>
        <td>${product_list[i].category}</td>
        <td>${product_list[i].Description}</td>
        <td>
        <button class="btn btn-sm bg-primary " onclick=" setdata(${i})"> update</button>
        <button class="btn btn-sm bg-danger " onclick=" deleteitem(${i})"> delete</button>
        </td>
      </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteitem(index) {
  product_list.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(product_list));
  display();
}
function setdata(data) {
  indexUpdate = data;
  var currentProduct = product_list[data];
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productCategoryInput.value = currentProduct.category;
  productDescriptionInput.value = currentProduct.Description;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function validName() {
  var text = productNameInput.value;
  var regexName = /^[a-zA-Z]{3,8}$/;
  if (regexName.test(text)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    return false;
  }
}
function validPrice() {
  var priceInput = productPriceInput.value;
  var regexPrice = /^([1-9]\d{0,5})(\.\d{1,2})?$/;
  if (regexPrice.test(priceInput)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    return false;
  }
}
function validCategory() {
  var Category = productCategoryInput.value;
  var regexCat = /^[a-zA-Z]{2,8}$/;
  if (regexCat.test(Category)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    return false;
  }
}
function validDesc() {
  var desc = productDescriptionInput.value;
  var regexDesc = /^[^\s][\w\s]{3,}$/;
  if (regexDesc.test(desc)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    return false;
  }
}
function update() {

  if (validName() && validPrice() && validCategory() && validDesc()) {
      var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      Description: productDescriptionInput.value,
    };
    product_list.splice(indexUpdate, 1, product);
    display();
    clearForm()
    productNameInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    localStorage.setItem("product", JSON.stringify(product_list));
  }
}
