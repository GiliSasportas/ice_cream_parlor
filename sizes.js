const arrBag = JSON.parse(localStorage.getItem("products"));
const choosen = arrBag[arrBag.length - 1];
const loadSize = () => {
  $.ajax({
    method: "GET",
    url: "/store.json",
    success: (products) => {
      const content = document.querySelector("#content");
      products.forEach((product) => {
        if (product.id === arrBag[arrBag.length - 1].id) {
          product.sizes.forEach((sizeA) => {
            const divSizes = document.createElement("div");
            const aSizes = document.createElement("a");
            const quantity = document.createElement("label");
            const price = document.createElement("label");
            const image = document.createElement("img");
            quantity.innerText = sizeA.quantity;
            image.src = `pictures/${sizeA.picture}`;
            image.classList.add("rounded");
            price.innerText = "מחיר: " + sizeA.price;
            price.classList.add("price");
            aSizes.append(quantity, image, price);
            divSizes.append(aSizes);
            content.append(divSizes);
            aSizes.onclick = () => {
              const sizeChoosen = {
                size: sizeA.size,
                price: sizeA.price,
                quantity: sizeA.quantity,
                tastesQuantity: sizeA.tastesQuantity,
                image: sizeA.picture,
              };
              if (sizeChoosen.tastesQuantity != 0) aSizes.href = "tastes.html";
              else aSizes.href = "extras.html";
              choosen.size = sizeChoosen;
              arrBag[arrBag.length - 1] = choosen;
              localStorage.setItem("products", JSON.stringify(arrBag));
            };
          });
        }
      });
    },
  });
};

loadSize();
