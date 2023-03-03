const form = document.querySelector("#post-form");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const file = document.querySelector("#file");

  console.log(file.files);

  const formData = new FormData();

  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("file", file.files[0]);

  fetch("/api/posts", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      window.location.reload();
     
    })
    .catch((err) => ("Something went wrong", err));
}
