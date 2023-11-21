const arrBag = JSON.parse(localStorage.getItem("products"));
const product = arrBag[arrBag.length - 1];
const content = document.querySelector("#content");
const divName = document.createElement("div");
const divSize = document.createElement("div");
const divTastes = document.createElement("div");
const divExtras = document.createElement("div");
const loadProduct = () => {
  const titleProduct = document.createElement("label");
  titleProduct.innerText = "מוצר: ";
  titleProduct.classList.add("title");
  const name = document.createElement("label");
  name.innerText = product.name;
  const image = document.createElement("img");
  image.classList.add("rounded-circle");
  image.src = `pictures/${product.image}`;
  divName.append(titleProduct, name, image);
  const titleSize = document.createElement("label");
  titleSize.innerText = "גודל: ";
  titleSize.classList.add("title");
  const quantity = document.createElement("label");
  quantity.innerText = product.size.quantity;
  const sizeImage = document.createElement("img");
  sizeImage.src = `pictures/${product.size.image}`;
  sizeImage.classList.add("rounded-circle");
  divSize.append(titleSize, quantity, sizeImage);
  const titleTastes = document.createElement("label");
  if (product.tastes.length > 0) {
    titleTastes.innerText = "טעם:  ";
    titleTastes.classList.add("title");
    divTastes.append(titleTastes);
  }
  product.tastes.forEach((taste) => {
    const tasteCurrent = document.createElement("div");
    const tasteName = document.createElement("label");
    tasteName.innerText = taste.name;
    const tasteImage = document.createElement("img");
    tasteImage.src = `pictures/${taste.image}`;
    tasteImage.classList.add("rounded-circle");
    tasteCurrent.append(tasteName, tasteImage);
    divTastes.append(tasteCurrent);
  });
  const titleExtras = document.createElement("label");
  if (product.Extras.length > 0) {
    titleExtras.innerText = "תוספות: ";
    titleExtras.classList.add("title");
    divExtras.append(titleExtras);
  }
  product.Extras.forEach((extra) => {
    const extraCurrent = document.createElement("div");
    const extraName = document.createElement("label");
    extraName.innerText = extra.name;
    const extraImage = document.createElement("img");
    extraImage.src = `pictures/${extra.image}`;
    extraImage.classList.add("rounded-circle");
    extraCurrent.append(extraName, extraImage);
    divExtras.append(extraCurrent);
  });
  const price = document.createElement("label");
  price.innerText = "  מחיר: " + product.size.price;
  price.classList.add("price");
  content.append(divName, divSize, divTastes, divExtras, price);
};
loadProduct();
const cancel = document.querySelector("#cancel");
cancel.onclick = () => {
  arrBag.pop();
};
