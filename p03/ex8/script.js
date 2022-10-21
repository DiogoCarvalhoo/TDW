var dogs_info = [
  {
    'title': "New First Dog",
    'text': "Description of the new first lovely dog",
    'image': "images/dogimage1.jpg"
  },
  {
    'title': "New Second Dog",
    'text': "Description of the new second lovely dog",
    'image': "images/dogimage2.jpg"
  },
  {
    'title': "New Third Dog",
    'text': "Description of the new third lovely dog",
    'image': "images/dogimage3.jpeg"
  },
  {
    'title': "New Fourth Dog",
    'text': "Description of the new fourth lovely dog",
    'image': "images/dogimage4.jpeg"
  },
  {
    'title': "New Fifth Dog",
    'text': "Description of the new fifth lovely dog",
    'image': "images/dogimage5.jpeg"
  },
  {
    'title': "New Sixth Dog",
    'text': "Description of the new sixth lovely dog",
    'image': "images/dogimage6.jpg"
  }
]
var current_number_of_cards = 0;
var card_id = 0;

function main() {
    
  const contentDiv = document.getElementById("contentDiv");

  for (let i = 0; i< dogs_info.length; i++) {
    if (current_number_of_cards % 4 == 0) {
      // New Row is required

      var newdiv = document.createElement("div");
      newdiv.classList.add("row")

      contentDiv.appendChild(newdiv);
    }
    createCard(dogs_info[i].title, dogs_info[i].text, dogs_info[i].image);
  }
};



function createCard(title, text, image) {

  var rows = document.getElementsByClassName("row");
  var row_to_add = rows.item(rows.length - 1);

  var newcard = document.createElement("card");
  newcard.id = "card" + card_id;
  newcard.classList.add("card");
  newcard.style.width = "18rem";
  newcard.style.margin = "10px 10px";
  newcard.addEventListener("click", handle_card_event);

  var newimg = document.createElement("img");
  newimg.classList.add("card-img-top");
  newimg.setAttribute("src", image);

  var newbody = document.createElement("div");
  newbody.classList.add("card-body");

  var newh5 = document.createElement("h5");
  newh5.classList.add("card-title");
  newh5.innerHTML = title;

  var newp = document.createElement("p");
  newp.classList.add("card-text");
  newp.innerText = text;

  var newbutton = document.createElement("button")
  newbutton.id = "cardButton" + card_id;
  newbutton.classList.add("btn");
  newbutton.classList.add("btn-primary");
  newbutton.innerText = "Remove Card";
  newbutton.style.visibility = "hidden";
  newbutton.name = "deletebutton";

  newbody.appendChild(newh5);
  newbody.appendChild(newp);
  newbody.appendChild(newbutton);
  newcard.appendChild(newimg);
  newcard.appendChild(newbody);

  row_to_add.appendChild(newcard);

  current_number_of_cards++;
  card_id++;
  /*
  contentDiv.innerHTML += "<div class=\"card\" style=\"width: 18rem;\"> \
                            <img class=\"card-img-top\" src=\"" +image+ "\" alt=\"Card image\"> \
                            <div class=\"card-body\"> \
                              <h5 class=\"card-title\">" + title + "</h5> \
                              <p class=\"card-text\">" + text + "</p> \
                              <button class="btn btn-primary" onclick="handle_new_card()">Add New Card</button> \
                            </div> \
                          </div>";*/
}


function handle_new_card() {
  var imageInput = document.getElementById("image-input");
  var titleInput = document.getElementById("title-input");
  var textInput = document.getElementById("text-input");


  createCard(titleInput.value, textInput.value, "images/"+imageInput.value)
}


function handle_card_event(event) {
  
  if (event.target.name == "deletebutton") {
    this.remove();
    current_number_of_cards--;
  
  } else {
    var id = this.id.substring(4)

    if (this.style.background != "lightblue") {
      this.style.background = "lightblue";
      document.getElementById("cardButton"+id).style.visibility = "visible";
    } else {
      this.style.background = "white";
      document.getElementById("cardButton"+id).style.visibility = "hidden";   
    }
  }
}
