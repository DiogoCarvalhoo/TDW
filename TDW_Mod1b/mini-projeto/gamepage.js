var api_url = "https://data.nba.net/10s/prod/v1/2022/";
var photos_api_url =
  "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/";
var news_api_url = "https://nba-stories.herokuapp.com/";

var players_g = [];
var players_f = [];
var players_c = [];
var selectedCenterPlayer = "";
var selectedLeftGuardPlayer = "";
var selectedRightGuardPlayer = "";
var selectedLeftForwardPlayer = "";
var selectedRightForwardPlayer = "";
var current_username = "";

var teams_id_dict = {
  1610612744: { Name: "Golden State Warriors", Conference: "West" },
  1610612747: { Name: "Los Angeles Lakers", Conference: "West" },
  1610612748: { Name: "Miami Heat", Conference: "East" },
  1610612758: { Name: "Sacramento Kings", Conference: "West" },
  1610612737: { Name: "Atlanta Hawks", Conference: "East" },
  1610612738: { Name: "Boston Celtics", Conference: "East" },
  1610612751: { Name: "Brooklyn Nets", Conference: "East" },
  1610612766: { Name: "Charlotte Hornets", Conference: "East" },
  1610612741: { Name: "Chicago Bulls", Conference: "East" },
  1610612739: { Name: "Cleveland Cavaliers", Conference: "East" },
  1610612742: { Name: "Dallas Mavericks", Conference: "West" },
  1610612743: { Name: "Denver Nuggets", Conference: "West" },
  1610612765: { Name: "Detroit Pistons", Conference: "East" },
  1610612745: { Name: "Houston Rockets", Conference: "West" },
  1610612754: { Name: "Indiana Pacers", Conference: "East" },
  1610612746: { Name: "LA Clippers", Conference: "West" },
  1610612763: { Name: "Memphis Grizzlies", Conference: "West" },
  1610612749: { Name: "Milwaukee Bucks", Conference: "East" },
  1610612750: { Name: "Minnesota Timberwolves", Conference: "West" },
  1610612740: { Name: "New Orleans Pelicans", Conference: "West" },
  1610612752: { Name: "New York Knicks", Conference: "East" },
  1610612760: { Name: "Oklahoma City Thunder", Conference: "West" },
  1610612753: { Name: "Orlando Magic", Conference: "East" },
  1610612753: { Name: "Philadelphia 76ers", Conference: "East" },
  1610612756: { Name: "Phoenix Suns", Conference: "West" },
  1610612757: { Name: "Portland Trail Blazers", Conference: "West" },
  1610612759: { Name: "San Antonio Spurs", Conference: "West" },
  1610612761: { Name: "Toronto Raptors", Conference: "East" },
  1610612762: { Name: "Utah Jazz", Conference: "West" },
  1610612764: { Name: "Washington Wizards", Conference: "East" },
};

const guard_left_card = document.getElementById("guard_left_card");
const guard_right_card = document.getElementById("guard_right_card");
const forward_left_card = document.getElementById("forward_left_card");
const forward_right_card = document.getElementById("forward_right_card");
const center_card = document.getElementById("center_card");

const list_guard_left = document.getElementById("list_guard_left");
const list_guard_right = document.getElementById("list_guard_right");
const list_forward_left = document.getElementById("list_forward_left");
const list_forward_right = document.getElementById("list_forward_right");
const list_center = document.getElementById("list_center");

const guard_left_input = document.getElementById("guard_left_input");
const guard_right_input = document.getElementById("guard_right_input");
const forward_left_input = document.getElementById("forward_left_input");
const forward_right_input = document.getElementById("forward_right_input");
const center_input = document.getElementById("center_input");

const guard_left_image = document.getElementById("guard_left_image");
const guard_right_image = document.getElementById("guard_right_image");
const forward_left_image = document.getElementById("forward_left_image");
const forward_right_image = document.getElementById("forward_right_image");
const center_image = document.getElementById("center_image");

const error_message = document.getElementById("error_message");

async function gamepage_main() {
  var url = window.location.href;
  current_username = url.substring(url.lastIndexOf("=") + 1, url.length);

  // Get Players Info
  await getAllPlayers();

  // Check if this user already has a team created
  var current_user_team = localStorage.getItem(current_username);
  current_user_team = JSON.parse(current_user_team);

  console.log(current_user_team);
  if (current_user_team != null && current_user_team != undefined) {
    updateCurrentUserTeam(current_user_team);
  }

  guard_left_input.addEventListener("change", guard_left_change);
  guard_right_input.addEventListener("change", guard_right_change);
  forward_left_input.addEventListener("change", forward_left_change);
  forward_right_input.addEventListener("change", forward_right_change);
  center_input.addEventListener("change", center_change);

  guard_left_image.addEventListener("error", handle_img_error);
  guard_right_image.addEventListener("error", handle_img_error);
  forward_left_image.addEventListener("error", handle_img_error);
  forward_right_image.addEventListener("error", handle_img_error);
  center_image.addEventListener("error", handle_img_error);
}

/* Function to Retrieve all Players Info */

async function getAllPlayers() {
  await fetch(api_url + "players.json").then(async function (response) {
    var json = await response.json();

    var duplicated_data = [
      ...json.league.sacramento,
      ...json.league.standard,
      ...json.league.utah,
      ...json.league.vegas,
    ];

    var players_already_added = new Set();
    for (let i = 0; i < duplicated_data.length; i++) {
      // Remove duplicated players
      if (
        !players_already_added.has(duplicated_data[i].personId) &&
        duplicated_data[i].teamId in teams_id_dict
      ) {
        if (duplicated_data[i].pos.includes("C")) {
          players_c.push(duplicated_data[i]);
          let player_option = document.createElement("option");
          player_option.value =
            duplicated_data[i].firstName + " " + duplicated_data[i].lastName;
          list_center.appendChild(player_option);
        }
        if (duplicated_data[i].pos.includes("F")) {
          players_f.push(duplicated_data[i]);
          let player_option = document.createElement("option");
          player_option.value =
            duplicated_data[i].firstName + " " + duplicated_data[i].lastName;
          list_forward_left.appendChild(player_option);
          let player_option_2 = document.createElement("option");
          player_option_2.value =
            duplicated_data[i].firstName + " " + duplicated_data[i].lastName;
          list_forward_right.appendChild(player_option_2);
        }
        if (duplicated_data[i].pos.includes("G")) {
          players_g.push(duplicated_data[i]);
          let player_option = document.createElement("option");
          player_option.value =
            duplicated_data[i].firstName + " " + duplicated_data[i].lastName;
          list_guard_left.appendChild(player_option);
          let player_option_2 = document.createElement("option");
          player_option_2.value =
            duplicated_data[i].firstName + " " + duplicated_data[i].lastName;
          list_guard_right.appendChild(player_option_2);
        }

        players_already_added.add(duplicated_data[i].personId);
      }
    }
  });
}

function guard_left_change(event) {
  for (let i = 0; i < players_g.length; i++) {
    let playerName = players_g[i].firstName + " " + players_g[i].lastName;

    if (
      playerName == event.target.value &&
      selectedRightGuardPlayer != playerName
    ) {
      guard_left_image.setAttribute(
        "src",
        photos_api_url + players_g[i].personId + ".png"
      );

      guard_left_card.classList.add("border");
      guard_left_card.classList.add("border-success");
      guard_left_card.classList.add("border-2");
      selectedLeftGuardPlayer = playerName;
      return;
    }
  }

  guard_left_card.classList.remove("border");
  guard_left_card.classList.remove("border-success");
  guard_left_card.classList.remove("border-2");
  selectedLeftGuardPlayer = "";
  guard_left_image.setAttribute("src", "assets/img/defaultPlayer.png");
}

function guard_right_change(event) {
  for (let i = 0; i < players_g.length; i++) {
    let playerName = players_g[i].firstName + " " + players_g[i].lastName;

    if (
      playerName == event.target.value &&
      selectedLeftGuardPlayer != playerName
    ) {
      guard_right_image.setAttribute(
        "src",
        photos_api_url + players_g[i].personId + ".png"
      );

      guard_right_card.classList.add("border");
      guard_right_card.classList.add("border-success");
      guard_right_card.classList.add("border-2");
      selectedRightGuardPlayer = playerName;
      return;
    }
  }

  guard_right_card.classList.remove("border");
  guard_right_card.classList.remove("border-success");
  guard_right_card.classList.remove("border-2");
  selectedRightGuardPlayer = "";
  guard_right_image.setAttribute("src", "assets/img/defaultPlayer.png");
}

function forward_left_change(event) {
  for (let i = 0; i < players_f.length; i++) {
    let playerName = players_f[i].firstName + " " + players_f[i].lastName;

    if (
      playerName == event.target.value &&
      selectedRightForwardPlayer != playerName
    ) {
      forward_left_image.setAttribute(
        "src",
        photos_api_url + players_f[i].personId + ".png"
      );

      forward_left_card.classList.add("border");
      forward_left_card.classList.add("border-success");
      forward_left_card.classList.add("border-2");
      selectedLeftForwardPlayer = playerName;
      return;
    }
  }

  forward_left_card.classList.remove("border");
  forward_left_card.classList.remove("border-success");
  forward_left_card.classList.remove("border-2");
  selectedLeftForwardPlayer = "";
  forward_left_image.setAttribute("src", "assets/img/defaultPlayer.png");
}

function forward_right_change(event) {
  for (let i = 0; i < players_f.length; i++) {
    let playerName = players_f[i].firstName + " " + players_f[i].lastName;

    if (
      playerName == event.target.value &&
      selectedLeftForwardPlayer != playerName
    ) {
      forward_right_image.setAttribute(
        "src",
        photos_api_url + players_f[i].personId + ".png"
      );

      forward_right_card.classList.add("border");
      forward_right_card.classList.add("border-success");
      forward_right_card.classList.add("border-2");
      selectedRightForwardPlayer = playerName;
      return;
    }
  }

  forward_right_card.classList.remove("border");
  forward_right_card.classList.remove("border-success");
  forward_right_card.classList.remove("border-2");
  selectedRightForwardPlayer = "";
  forward_right_image.setAttribute("src", "assets/img/defaultPlayer.png");
}

function center_change(event) {
  for (let i = 0; i < players_c.length; i++) {
    let playerName = players_c[i].firstName + " " + players_c[i].lastName;

    if (playerName == event.target.value) {
      center_image.setAttribute(
        "src",
        photos_api_url + players_c[i].personId + ".png"
      );

      center_card.classList.add("border");
      center_card.classList.add("border-success");
      center_card.classList.add("border-2");
      selectedCenterPlayer = playerName;
      return;
    }
  }

  center_card.classList.remove("border");
  center_card.classList.remove("border-success");
  center_card.classList.remove("border-2");
  selectedCenterPlayer = "";
  center_image.setAttribute("src", "assets/img/defaultPlayer.png");
}

function handle_img_error(event) {
  event.target.src = "assets/img/defaultPlayer.png";
  event.onerror = null;
}

function handle_confirm_team() {
  error_message.style.visibility = "hidden";
  if (
    selectedCenterPlayer == "" ||
    selectedLeftForwardPlayer == "" ||
    selectedLeftGuardPlayer == "" ||
    selectedRightForwardPlayer == "" ||
    selectedRightGuardPlayer == ""
  ) {
    error_message.style.visibility = "visible";
    window.scrollTo(0, 0);
    return;
  }

  let center_score = parseFloat((Math.random() * 10).toFixed(2));
  let left_forward_score = parseFloat((Math.random() * 10).toFixed(2));
  let right_forward_score = parseFloat((Math.random() * 10).toFixed(2));
  let left_guard_score = parseFloat((Math.random() * 10).toFixed(2));
  let right_guard_score = parseFloat((Math.random() * 10).toFixed(2));
  let final_score = parseFloat(
    (
      center_score +
      left_forward_score +
      left_guard_score +
      right_forward_score +
      right_guard_score
    ).toFixed(2)
  );

  scores = {
    center: selectedCenterPlayer,
    center_score: center_score,
    left_forward: selectedLeftForwardPlayer,
    left_forward_score: left_forward_score,
    right_forward: selectedRightForwardPlayer,
    right_forward_score: right_forward_score,
    left_guard: selectedLeftGuardPlayer,
    left_guard_score: left_guard_score,
    right_guard: selectedRightGuardPlayer,
    right_guard_score: right_guard_score,
    final_score: final_score,
  };
  localStorage.setItem(current_username, JSON.stringify(scores));

  window.location.href =
    window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
    "/gamelogin.html";
}

function updateCurrentUserTeam(current_user_team) {
  for (let i = 0; i < players_c.length; i++) {
    let playerName = players_c[i].firstName + " " + players_c[i].lastName;

    if (playerName == current_user_team.center) {
      center_image.setAttribute(
        "src",
        photos_api_url + players_c[i].personId + ".png"
      );

      center_card.classList.add("border");
      center_card.classList.add("border-success");
      center_card.classList.add("border-2");
      selectedCenterPlayer = playerName;
      break;
    }
  }

  for (let i = 0; i < players_f.length; i++) {
    let playerName = players_f[i].firstName + " " + players_f[i].lastName;

    if (playerName == current_user_team.right_forward) {
      forward_right_image.setAttribute(
        "src",
        photos_api_url + players_f[i].personId + ".png"
      );

      forward_right_card.classList.add("border");
      forward_right_card.classList.add("border-success");
      forward_right_card.classList.add("border-2");
      selectedRightForwardPlayer = playerName;
      continue;
    }

    if (playerName == current_user_team.left_forward) {
      forward_left_image.setAttribute(
        "src",
        photos_api_url + players_f[i].personId + ".png"
      );

      forward_left_card.classList.add("border");
      forward_left_card.classList.add("border-success");
      forward_left_card.classList.add("border-2");
      selectedLeftForwardPlayer = playerName;
      continue;
    }
  }

  for (let i = 0; i < players_g.length; i++) {
    let playerName = players_g[i].firstName + " " + players_g[i].lastName;

    if (playerName == current_user_team.right_guard) {
      guard_right_image.setAttribute(
        "src",
        photos_api_url + players_g[i].personId + ".png"
      );

      guard_right_card.classList.add("border");
      guard_right_card.classList.add("border-success");
      guard_right_card.classList.add("border-2");
      selectedRightGuardPlayer = playerName;
      continue;
    }

    if (playerName == current_user_team.left_guard) {
      guard_left_image.setAttribute(
        "src",
        photos_api_url + players_g[i].personId + ".png"
      );

      guard_left_card.classList.add("border");
      guard_left_card.classList.add("border-success");
      guard_left_card.classList.add("border-2");
      selectedLeftGuardPlayer = playerName;
      continue;
    }
  }
}
