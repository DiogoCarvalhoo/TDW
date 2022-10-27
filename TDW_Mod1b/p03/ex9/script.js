const cards = document.getElementById("cards");

function main() {
  const arrClass = document.querySelectorAll(".btn");
  for (let i of arrClass) {
    i.addEventListener("click", handleCards);
  }

  const url = "https://randomuser.me/api/?results=10";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        add_card(data.results[i]);
      }
    });
}

function add_card(person_info) {
  console.log(person_info);

  let general_div = document.createElement("div");
  general_div.classList.add("card");
  general_div.style.width = "18rem";
  general_div.style.marginTop = "10px";

  let image = document.createElement("img");
  image.classList.add("card-img-top");
  image.setAttribute("src", person_info.picture.large);
  image.setAttribute("alt", "Person thumbnail image");

  let inner_div = document.createElement("div");
  inner_div.classList.add("card-body");

  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerHTML = person_info.name.first + " " + person_info.name.last;

  let p = document.createElement("p");
  p.classList.add("card-text");
  p.innerHTML = person_info.location.city + ", " + person_info.location.country;

  inner_div.appendChild(h5);
  inner_div.appendChild(p);
  general_div.appendChild(image);
  general_div.appendChild(inner_div);
  cards.appendChild(general_div);
}
