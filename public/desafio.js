let usersForm = document.getElementById("usersForm");
let petsForm = document.getElementById("petsForm");

const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  fetch(route, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
};

usersForm.addEventListener("submit", (e) =>  handleSubmit(e, e.target, "/productos"));
