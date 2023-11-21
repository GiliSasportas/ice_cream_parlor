const arrBag = JSON.parse(localStorage.getItem("products"));
const choosen = arrBag[arrBag.length - 1];
const extrasChoosen = [];
const divAlert = document.querySelector("#alert");
let availableToPress = true;
const loadExtras = () => {
  $.ajax({
    method: "GET",
    url: "/store.json",
    success: (products) => {
      const content = document.querySelector("#content");
      products.forEach((product) => {
        if (product.id === arrBag[arrBag.length - 1].id)
          product.Extras.forEach((extra) => {
            const divExtras = document.createElement("div");
            const name = document.createElement("label");
            const image = document.createElement("img");
            name.innerText = extra.name;
            image.src = `pictures/${extra.picture}`;
            image.classList.add("rounded");
            image.classList.add("container-fluid");
            divExtras.append(image, name);
            content.append(divExtras);
            divExtras.onclick = () => {
              if (!availableToPress) return;
              availableToPress = false;
              const findFunc = (value) => {
                return value.name === extra.name;
              };
              const findEqualsObject = extrasChoosen.find(findFunc);
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
                const extraObject = { name: extra.name, image: extra.picture };
                extrasChoosen.push(extraObject);
                choosen.Extras = extrasChoosen;
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
            };
          });
      });
    },
  });
};

loadExtras();
