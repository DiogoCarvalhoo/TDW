const cards = document.getElementById("cards");
const arrClass = document.querySelectorAll(".btn");
for (let i of arrClass) {
    i.addEventListener("click", buildCards);
}

function buildCards(e) {
    cards.innerHTML = ""
    for (let i = 1; i <= e.target.value; i++) {
    switch (i % 4) {
        case 0:
        add_card("Cartão de exemplo", "bg-success");
        break;
        case 1:
        add_card("Cartão de exemplo", "bg-danger");
        break;
        case 2:
        add_card("Cartão de exemplo", "bg-info");
        break;
        default:
        add_card("Cartão de exemplo", "bg-primary");
        break;
    }
    }
}

function add_card(text, color) {
    cards.innerHTML += "<div class=\"col-md-3 mb-3\"> \
                            <div class=\"card "+ color +"\"> \
                            <div class=\"card-body\"> \
                                " + text + " \
                            </div> \
                            </div> \
                        </div>";
}