const divContent = document.querySelector("#content");
const cities = document.querySelector(".selected");
let selectValue = "בחר עיר";

const foncFilter = (value) => {
  return value.city === selectValue;
};
const loadBranches = () => {
  $.ajax({
    method: "GET",
    url: "/branches.json",
    success: (branches) => {
      if (selectValue != "בחר עיר") branches = branches.filter(foncFilter);
      divContent.innerHTML = "";
      branches.forEach((branch) => {
        const branchLable = document.createElement("h2");
        branchLable.innerText =
          " " + branch.city + " " + branch.street + " " + branch.housNumber;
        divContent.append(branchLable);
      });
    },
  });
};
loadBranches();

cities.onchange = () => {
  selectValue = cities.value;
  loadBranches();
};
