const arrBag = JSON.parse(localStorage.getItem("products")) || [];
if (
  arrBag.length > 0 &&
  (arrBag[arrBag.length - 1].size === null ||
    (arrBag[arrBag.length - 1].size.tastesQuantity > 0 &&
      arrBag[arrBag.length - 1].tastes.length === 0))
) {
  arrBag.pop();
}
let sum = 0;
const divSumPayment = document.querySelector("#sumPayment");
const divContent = document.querySelector("#content");
arrBag.forEach((currentProduct, i) => {
  const divProduct = document.createElement("div");
  const name = document.createElement("label");
  name.innerText = currentProduct.name;
  const image = document.createElement("img");
  image.classList.add("rounded-circle");
  image.src = `pictures/${currentProduct.image}`;
  const price = document.createElement("label");
  price.innerText = "מחיר: " + currentProduct.size.price;
  const removeButton = document.createElement("button");
  removeButton.innerText = "להסרה מהסל";
  removeButton.classList.add("removeButton");
  divProduct.append(name, image, price, removeButton);
  divContent.append(divProduct);
  removeButton.onclick = () => {
    arrBag.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(arrBag));
    top.location.reload();
  };
  sum += currentProduct.size.price;
});
const labelSum = document.createElement("label");
labelSum.innerText = "סך הכל לתשלום: " + sum;
divSumPayment.append(labelSum);
localStorage.setItem("products", JSON.stringify(arrBag));
