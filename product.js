const arrBag = JSON.parse(localStorage.getItem("products")) || [];
if (
  arrBag.length > 0 &&
  (arrBag[arrBag.length - 1].size === null ||
    (arrBag[arrBag.length - 1].size.tastesQuantity > 0 &&
      arrBag[arrBag.length - 1].tastes.length === 0))
) {
  arrBag.pop();
}
const loadProduct = () => {
  $.ajax({
    method: "GET",
    url: "/store.json",
    success: (products) => {
      const content = document.querySelector("#content");
      products.forEach((product) => {
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.href = "sizes.html";
        const name = document.createElement("label");
        const image = document.createElement("img");
        name.innerText = product.name;
        image.src = `pictures/${product.picture}`;
        image.classList.add("rounded");
        a.append(name);
        div.append(image, a);
        content.append(div);
        a.onclick = () => {
          const choosen = {
            id: product.id,
            name: product.name,
            image: product.picture,
            size: null,
            tastes: [],
            Extras: [],
          };
          arrBag.push(choosen);
          localStorage.setItem("products", JSON.stringify(arrBag));
        };
      });
    },
  });
};

loadProduct();
