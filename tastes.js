const arrBag = JSON.parse(localStorage.getItem("products"));
const choosen = arrBag[arrBag.length - 1];
const tastesChoosen = [];
let availableToPress = true;
const loadTastes = () => {
  $.ajax({
    method: "GET",
    url: "/store.json",
    success: (products) => {
      const content = document.querySelector("#content");
      products.forEach((product) => {
        if (product.id === arrBag[arrBag.length - 1].id) {
          const limit = choosen.size.tastesQuantity;
          let countTastes = 0;
          product.tastes.forEach((taste) => {
            const divAlert = document.querySelector("#alert");
            const divTastes = document.createElement("div");
            const name = document.createElement("label");
            const image = document.createElement("img");
            name.innerText = taste.name;
            image.src = `pictures/${taste.picture}`;
            image.classList.add("rounded");
            divTastes.append(image, name);
            content.append(divTastes);
            divTastes.onclick = () => {
              if (!availableToPress) return;
              availableToPress = false;
              if (countTastes < limit) {
                const findFunc = (value) => {
                  return value.name === taste.name;
                };
                const findEqualsObject = tastesChoosen.find(findFunc);
                if (findEqualsObject) {
                  const strong = document.createElement("strong");
                  strong.innerText = "Warning!";
                  const h3 = document.createElement("h3");
                  h3.innerText = "בחירה זו כבר נקלטה במערכת";
                  divAlert.append(strong, h3);
                  divAlert.classList.add("alert");
                  divAlert.classList.add("alert-warning");
                  setTimeout(() => {
                    divAlert.removeChild(strong);
                    divAlert.removeChild(h3);
                    divAlert.classList.remove("alert");
                    divAlert.classList.remove("alert-warning");
                    availableToPress = true;
                  }, 1000);
                } else {
                  countTastes += 1;
                  const tasteObject = {
                    name: taste.name,
                    image: taste.picture,
                  };
                  tastesChoosen.push(tasteObject);
                  choosen.tastes = tastesChoosen;
                  arrBag[arrBag.length - 1] = choosen;
                  localStorage.setItem("products", JSON.stringify(arrBag));

                  const strong = document.createElement("strong");
                  strong.innerText = "Success!";
                  const h3 = document.createElement("h3");
                  h3.innerText = "בחירתך נקלטה במערכת";
                  divAlert.append(strong, h3);
                  divAlert.classList.add("alert");
                  divAlert.classList.add("alert-success");
                  setTimeout(() => {
                    divAlert.removeChild(strong);
                    divAlert.removeChild(h3);
                    divAlert.classList.remove("alert");
                    divAlert.classList.remove("alert-success");
                    availableToPress = true;
                  }, 1000);
                }
              }
            };
          });
        }
      });
    },
  });
};

loadTastes();
