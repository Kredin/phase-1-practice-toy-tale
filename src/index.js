let addToy = false;
const submit = document.querySelector(".add-toy-form");
const likeBtn = document.querySelectorAll(".like-btn");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", (e) => {
  getToys();
});

function getToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => postToys(data));
}

function postToys(data) {
  const collection = document.querySelector("#toy-collection");
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "card");

    let h2 = document.createElement("h2");
    h2.textContent = data[i].name;

    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "toy-avatar");

    let p = document.createElement("p");
    p.textContent = `${data[i].likes} Likes`;

    let btn = document.createElement("button");
    btn.setAttribute("class", "like-btn");
    btn.setAttribute("id", data[i].id);
    btn.setAttribute("type", "button");
    btn.textContent = "Like ❤️";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const toyId = e.target.id;
      let likesCount = e.target.parentElement.children[2].textContent;
      let splitCount = likesCount.split(" ");
      let count = parseInt(splitCount[0]);
      count += 1;
      console.log(toyId);
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: count }),
      });
      likesCount = `${count} Likes`;
    });

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);

    collection.appendChild(div);
  }
}

function newToy(nam, img) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: nam, image: img, likes: 0 }),
  });
}

submit.addEventListener("submit", (e) => {
  console.log(e);
  const nam = document.getElementsByName("name")[0].value;
  const img = document.getElementsByName("image")[0].value;
  newToy(nam, img);
  e.preventDefault();
});
