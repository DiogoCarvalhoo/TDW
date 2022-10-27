const ranking_table = document.getElementById("ranking_table_body");

function gamelogin_main() {
  document
    .getElementById("username_input")
    .addEventListener("keypress", handle_login_submission);

  let users = JSON.parse(localStorage.getItem("users"));

  if (users != null && users != undefined) {
    let contador = 0;
    for (let i = 0; i < users.length; i++) {
      let user_results = JSON.parse(localStorage.getItem(users[[i]]));

      if (user_results != null && user_results != undefined) {
        console.log(user_results);

        var new_tr = document.createElement("tr");

        var new_th = document.createElement("th");
        new_th.setAttribute("scope", "row");
        new_th.innerHTML = contador++;

        var new_td1 = document.createElement("td");
        new_td1.innerHTML = users[i];

        var new_td2 = document.createElement("td");
        new_td2.innerHTML = user_results.final_score;

        new_tr.appendChild(new_th);
        new_tr.appendChild(new_td1);
        new_tr.appendChild(new_td2);
        ranking_table.appendChild(new_tr);
      }
    }
  }
}

function handle_login_submission(event) {
  if (event.code == "Enter" && event.target.value.length > 0) {
    let new_username = event.target.value;
    let users = JSON.parse(localStorage.getItem("users"));

    if (users == undefined) users = [];

    if (!users.includes(new_username)) {
      users.push(event.target.value);
      localStorage.setItem("users", JSON.stringify(users));
    }

    window.location.href =
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
      "/gamepage.html?username=" +
      new_username;
  }
}
