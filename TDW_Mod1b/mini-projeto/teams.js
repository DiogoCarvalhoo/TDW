var api_url = 'https://data.nba.net/10s/prod/v1/2022/';
var photos_api_url = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/';
var news_api_url = 'https://nba-stories.herokuapp.com/'


const teams_content_row = document.getElementById("teams_content_row");

const paginator_number_R = document.getElementById("paginator_number_R");
const paginator_number_1 = document.getElementById("paginator_number_1");
const paginator_number_2 = document.getElementById("paginator_number_2");
const paginator_number_L = document.getElementById("paginator_number_L");

const number_nba_teams_h6 = document.getElementById("number_nba_teams_h6");
const number_west_teams_h6 = document.getElementById("number_west_teams_h6");
const number_east_teams_h6 = document.getElementById("number_east_teams_h6");

var teams = [];
var current_conference_filter;
var current_name_filter;
var current_filtered_teams = [];

var teams_id_dict = {
    "1610612744": {"Name": "Golden State Warriors", "Conference": "West"},
    "1610612747": {"Name": "Los Angeles Lakers", "Conference": "West"},
    "1610612748": {"Name": "Miami Heat", "Conference": "East"},
    "1610612758": {"Name": "Sacramento Kings", "Conference": "West"},
    "1610612737": {"Name": "Atlanta Hawks", "Conference": "East"},
    "1610612738": {"Name": "Boston Celtics", "Conference": "East"},
    "1610612751": {"Name": "Brooklyn Nets", "Conference": "East"},
    "1610612766": {"Name": "Charlotte Hornets", "Conference": "East"},
    "1610612741": {"Name": "Chicago Bulls", "Conference": "East"},
    "1610612739": {"Name": "Cleveland Cavaliers", "Conference": "East"},
    "1610612742": {"Name": "Dallas Mavericks", "Conference": "West"},
    "1610612743": {"Name": "Denver Nuggets", "Conference": "West"},
    "1610612765": {"Name": "Detroit Pistons", "Conference": "East"},
    "1610612745": {"Name": "Houston Rockets", "Conference": "West"},
    "1610612754": {"Name": "Indiana Pacers", "Conference": "East"},
    "1610612746": {"Name": "LA Clippers", "Conference": "West"},
    "1610612763": {"Name": "Memphis Grizzlies", "Conference": "West"},
    "1610612749": {"Name": "Milwaukee Bucks", "Conference": "East"},
    "1610612750": {"Name": "Minnesota Timberwolves", "Conference": "West"},
    "1610612740": {"Name": "New Orleans Pelicans", "Conference": "West"},
    "1610612752": {"Name": "New York Knicks", "Conference": "East"},
    "1610612760": {"Name": "Oklahoma City Thunder", "Conference": "West"},
    "1610612753": {"Name": "Orlando Magic", "Conference": "East"},
    "1610612755": {"Name": "Philadelphia 76ers", "Conference": "East"},
    "1610612756": {"Name": "Phoenix Suns", "Conference": "West"},
    "1610612757": {"Name": "Portland Trail Blazers", "Conference": "West"},
    "1610612759": {"Name": "San Antonio Spurs", "Conference": "West"},
    "1610612761": {"Name": "Toronto Raptors", "Conference": "East"},
    "1610612762": {"Name": "Utah Jazz", "Conference": "West"},
    "1610612764": {"Name": "Washington Wizards", "Conference": "East"}
}


async function teams_main() {

    // Get Teams Info
    teams = await getAllTeams();
    current_filtered_teams = teams;
    current_conference_filter = "all";
    current_name_filter = undefined;
    
    // Update Teams Page Top Cards
    number_nba_teams_h6.innerHTML = teams.length;
    number_nba_teams_h6.style.textDecoration = "underline";
    number_west_teams_h6.innerHTML = 15;
    number_east_teams_h6.innerHTML = 15;

    // Create Initial Teams List
    createTeamsPage(1);

    // Create Initial Paginator
    updatesTeamsPaginator(1);
}



/* Function to Retrieve all Teams Info */

async function getAllTeams() {
    var data = [];

    await fetch(api_url + "teams.json")
    .then(async function(response) {
        var json = await response.json();
        var duplicated_data = [...json.league.sacramento, ...json.league.standard, ...json.league.utah, ...json.league.vegas];

        var teams_already_added = new Set();
        for (let i = 0; i< duplicated_data.length; i++) {
            // Remove duplicated and non-nba teams
            if (!(teams_already_added.has(duplicated_data[i].fullName)) && (duplicated_data[i].fullName != "Ra'anana Maccabi Ra'anana") && duplicated_data[i].fullName != "Adelaide 36ers")  {
                data.push(duplicated_data[i])
                teams_already_added.add(duplicated_data[i].fullName)
            }
        }
    })

    return data;

}


/* Function to Create Team Card on Team Page */

function createTeamCard(team_info, current_row) {

    var col_div = document.createElement("div");
    col_div.classList.add("col-md-3");
    col_div.addEventListener("click", function() {
        let current_url = window.location.href;
        window.location.href = current_url.substring(0, current_url.lastIndexOf('/')) + "/team.html?id="+team_info.teamId
    })

    var card_div = document.createElement("div");
    card_div.classList.add("card");

    var card_img = document.createElement("img");
    card_img.setAttribute("src", "assets/img/logos/" + team_info.fullName +  ".png" );
    card_img.classList.add("card-img-top");
    card_img.setAttribute("alt", "Team Image");

    var card_body_div = document.createElement("div");
    card_body_div.classList.add("card-body");

    var card_h5 = document.createElement("h5");
    card_h5.classList.add("card-title");
    card_h5.innerHTML = team_info.fullName;

    card_body_div.appendChild(card_h5);
    card_div.appendChild(card_img);
    card_div.appendChild(card_body_div);
    col_div.appendChild(card_div);
    current_row.appendChild(col_div);
}


/* Function to Create a Specific Page of Teams Cards */
function createTeamsPage(number_of_page) {

    teams_content_row.innerHTML = "";

    let first_card = (number_of_page - 1) * 16;
    let last_card = first_card + 16

    if (last_card > current_filtered_teams.length) last_card = current_filtered_teams.length;

    for (let i = first_card; i < last_card; i++) {
        createTeamCard(current_filtered_teams[i], teams_content_row);
    }
}



/* Function that handles changes in Teams Page Paginator */

function handleTeamsPageChange(a_element_id) {

    var current_page_number;

    if (a_element_id == "L") {
        current_page_number = 1;
    } else if (a_element_id == "R") {
        current_page_number = Math.ceil(current_filtered_teams.length/16);
    } else if (a_element_id == "1") {
        current_page_number = parseInt(paginator_number_1.innerHTML)
    } else if (a_element_id == "2") {
        current_page_number = parseInt(paginator_number_2.innerHTML)
    } else if (a_element_id == "3") {
        current_page_number = parseInt(paginator_number_3.innerHTML)
    } else if (a_element_id == "4") {
        current_page_number = parseInt(paginator_number_4.innerHTML)
    } else if (a_element_id == "5") {
        current_page_number = parseInt(paginator_number_5.innerHTML)
    } 

    createTeamsPage(current_page_number);
    updatesTeamsPaginator(current_page_number);
}


/* Function that updates Teams Page Paginator Numbers */

function updatesTeamsPaginator(current_page) {

    paginator_number_3.innerHTML = String(current_page);

    if (current_page > 1) {
        paginator_number_2.innerHTML = String(current_page-1);
        paginator_number_2.style.visibility = "visible";
    }
    else paginator_number_2.style.visibility = "hidden";

    if (current_page > 2) {
        paginator_number_1.innerHTML = String(current_page-2)
        paginator_number_1.style.visibility = "visible";
    }
    else paginator_number_1.style.visibility = "hidden";

    if (Math.ceil(current_filtered_teams.length/16) > current_page) {
        paginator_number_4.innerHTML = String(current_page + 1)
        paginator_number_4.style.visibility = "visible";
    }
    else paginator_number_4.style.visibility = "hidden";

    if (Math.ceil(current_filtered_teams.length/16) > current_page + 1) {
        paginator_number_5.innerHTML = String(current_page + 2)
        paginator_number_5.style.visibility = "visible";
    }
    else paginator_number_5.style.visibility = "hidden";
}



/* Function to filter teams by conference */ 

function filterTeamsByConference(filter) {
    current_conference_filter = filter;
    current_filtered_teams = []

    number_nba_teams_h6.style.textDecoration = "none";
    number_west_teams_h6.style.textDecoration = "none";
    number_east_teams_h6.style.textDecoration = "none";

    if (filter == "all") {
        number_nba_teams_h6.style.textDecoration = "underline";

        for (let i = 0; i < teams.length; i++) {
            if (current_name_filter == undefined || teams[i].fullName.startsWith(current_name_filter)) {
                current_filtered_teams.push(teams[i])
            }
        }

    } else {

        for (let i = 0; i < teams.length; i++) {
            if ((current_name_filter == undefined || teams[i].fullName.startsWith(current_name_filter)) && teams_id_dict[teams[i].teamId]["Conference"] == filter)
                current_filtered_teams.push(teams[i])
        }

        if (filter == "West")     number_west_teams_h6.style.textDecoration = "underline";
        else                      number_east_teams_h6.style.textDecoration = "underline";
    }

    createTeamsPage(1);
    updatesTeamsPaginator(1);

}



/* Function to filter teams by name */ 

function filterTeamsByName() {
    current_name_filter = document.getElementById("team_name_filter_input").value;
    current_filtered_teams = [];

    var all_counter = 0;
    var west_counter = 0;
    var east_counter = 0;

    for (let i = 0; i < teams.length; i++) {
        if (current_name_filter == undefined || teams[i].fullName.startsWith(current_name_filter)) {
            all_counter++;

            if (teams_id_dict[teams[i].teamId]["Conference"] == "West") west_counter++;
            if (teams_id_dict[teams[i].teamId]["Conference"] == "East") east_counter++;

            if (teams_id_dict[teams[i].teamId]["Conference"] == current_conference_filter || current_conference_filter == "all") {
                current_filtered_teams.push(teams[i])
            }
        }
    }

    createTeamsPage(1);
    updatesTeamsPaginator(1);

    number_nba_teams_h6.innerHTML = all_counter;
    number_west_teams_h6.innerHTML = west_counter;
    number_east_teams_h6.innerHTML = east_counter;
}