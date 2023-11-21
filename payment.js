const divBranches = document.querySelector(".selectBranch");
const form = document.querySelector("#paymentForm");
const loadBranches = () => {
  $.ajax({
    method: "GET",
    url: "/branches.json",
    success: (branches) => {
      branches.forEach((branch) => {
        const branchOptoin = document.createElement("option");
        branchOptoin.innerText =
          " " + branch.city + " " + branch.street + " " + branch.housNumber;
        divBranches.append(branchOptoin);
      });
    },
  });
};
loadBranches();
form.onsubmit = (event) => {
  event.preventDefult();
};
