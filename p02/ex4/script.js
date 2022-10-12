function main() { 
    for (let i = 1; i <= 100; i++) {
        let color;

        switch (i % 4) {
        case 0:
            color = "bg-success"
            break;
        case 1:
            color = "bg-danger"
            break;
        case 2:
            color = "bg-info"
            break;
        default:
            color = "bg-primary"
            break;
        }
        add_card("Cartão de exemplo", color);
        
    }
};

function add_card(text, color) {
    const cards = document.getElementById("cards");
    cards.innerHTML += "<div class=\"col-md-3 mb-3\"> \
                            <div class=\"card "+ color +"\"> \
                                <div class=\"card-body\"> \
                                " + text + " \
                                </div> \
                            </div> \
                            </div>";
}