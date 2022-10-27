var api_url = 'https://data.nba.net/10s/prod/v1/2022/';
var photos_api_url = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/';
var news_api_url = 'https://nba-stories.herokuapp.com/'


var teams_id_dict = {
    "1610612744": { "Name": "Golden State Warriors",
                    "Conference": "Western Conference",
                    "Description": "The Golden State Warriors are an American professional basketball team based in San Francisco. The Warriors compete in the National Basketball Association (NBA), as a member of the league's Western Conference Pacific Division."},
    "1610612747": { "Name": "Los Angeles Lakers", 
                    "Conference": "Western Conference",
                    "Description": "Los Angeles Lakers é um time de basquetebol da NBA (National Basketball Association) com sede em Los Angeles, Califórnia."},
    "1610612748": { "Name": "Miami Heat", 
                    "Conference": "Eastern Conference",
                    "Decription": "O Miami Heat é um time norte-americano de basquete profissional com sede em Miami. O Heat compete na National Basketball Association como membro da Divisão Sudeste da Conferência Leste."},
    "1610612758": { "Name": "Sacramento Kings", 
                    "Conference": "Western Conference",
                    "Description": "O Sacramento Kings é um time de basquete profissional que disputa a National Basketball Association, localizado em Sacramento, California."},
    "1610612737": { "Name": "Atlanta Hawks", 
                    "Conference": "Eastern Conference",
                    "Description": "O Atlanta Hawks é um time americano de basquete profissional com sede em Atlanta. Os Hawks competem na National Basketball Association como membro da Divisão Sudeste da Conferência Leste."},
    "1610612738": { "Name": "Boston Celtics", 
                    "Conference": "Eastern Conference",
                    "Description": "O Boston Celtics é uma franquia de basquetebol filiada à National Basketball Association e situada na cidade de Boston, no estado americano de Massachusetts."},
    "1610612751": { "Name": "Brooklyn Nets",
                    "Conference": "Eastern Conference",
                    "Description": "O Brooklyn Nets é um time de basquete profissional americano baseado no bairro de Brooklyn, em Nova York. Os Nets competem na National Basketball Association como membro da Divisão Atlântica da Conferência Leste."},
    "1610612766": { "Name": "Charlotte Hornets",
                    "Conference": "Eastern Conference",
                    "Description": "O Charlotte Hornets é um time norte-americano de basquete profissional com sede em Charlotte, Carolina do Norte. Os Hornets competem na National Basketball Association como um membro da Divisão Sudeste da Conferência Leste."},
    "1610612741": { "Name": "Chicago Bulls",
                    "Conference": "Eastern Conference",
                    "Description": "O Chicago Bulls é um time de basquete profissional americano sediado em Chicago, Illinois. Os Bulls competem na National Basketball Association como um membro da Divisão Central da Conferência Leste da liga."},
    "1610612739": { "Name": "Cleveland Cavaliers",
                    "Conference": "Eastern Conference",
                    "Description": "O Cleveland Cavaliers, mais conhecido como Cavs, é uma equipe americana de basquetebol profissional sediada em Cleveland, Ohio. Os Cavaliers competem na NBA como membro da Divisão Central da Conferência Leste."},
    "1610612742": { "Name": "Dallas Mavericks",
                    "Conference": "Western Conference",
                    "Description": "O Dallas Mavericks é uma franquia de basquete da National Basketball Association localizado em Dallas, Texas, onde divide a arena American Airlines Center com a equipe de hóquei no gelo Dallas Stars da NHL. A franquia foi fundada em 1980, e seu atual dono é o bilionário Mark Cuban."},
    "1610612743": { "Name": "Denver Nuggets",
                    "Conference": "Western Conference",
                    "Description": "O Denver Nuggets é um time norte-americano de basquete profissional com sede em Denver, Colorado. Os Nuggets competem na National Basketball Association como membro da Divisão Noroeste da Conferência Oeste."},
    "1610612765": { "Name": "Detroit Pistons",
                    "Conference": "Eastern Conference",
                    "Description": "O Detroit Pistons é uma franquia de basquete profissional que disputa a National Basketball Association, localizada em Detroit, Michigan. A franquia foi fundada em 1941 e entrou na NBA em 1948. Nos primeiros anos, localizava-se em Indiana. Mudou-se para Michigan em 1957."},
    "1610612745": { "Name": "Houston Rockets",
                    "Conference": "Western Conference",
                    "Description": "Houston Rockets é uma equipe profissional norte-americana de basquetebol baseada em Houston, Texas. Os Rockets competem na National Basketball Association como membros da Conferência Oeste, divisão sudoeste. A equipe tem como arena o Toyota Center, onde jogam os seus jogos de casa."},
    "1610612754": { "Name": "Indiana Pacers",
                    "Conference": "Eastern Conference",
                    "Description": "O Indiana Pacers é um time americano de basquete profissional com sede em Indianápolis. Os Pacers competem na National Basketball Association como um membro da Divisão Central da Conferência Leste."},
    "1610612746": { "Name": "LA Clippers",
                    "Conference": "Western Conference",
                    "Description": "O Los Angeles Clippers é um time de basquete da National Basketball Association franqueado em Los Angeles, California, onde divide a arena Staples Center com o Los Angeles Lakers. O time foi fundado em 1970 e já foi conhecido como Buffalo Braves e San Diego Clippers."},
    "1610612763": { "Name": "Memphis Grizzlies",
                    "Conference": "Western Conference",
                    "Description": "O Memphis Grizzlies é um time de basquete da National Basketball Association localizado em Memphis, Tennessee. O time foi fundado em 1995, como Vancouver Grizzlies, e esteve no Canadá de 1995 a 2001. "},
    "1610612749": { "Name": "Milwaukee Bucks",
                    "Conference": "Eastern Conference",
                    "Description": "O Milwaukee Bucks é um time de basquete profissional americano sediado em Milwaukee. Os Bucks competem na National Basketball Association como membros da Divisão Central da Conferência Leste. A equipe foi fundada em 1968 como uma equipe de expansão."},
    "1610612750": { "Name": "Minnesota Timberwolves",
                    "Conference": "Western Conference",
                    "Description": "O Minnesota Timberwolves é um time norte-americano de basquete profissional com sede em Minneapolis. Os Timberwolves competem na National Basketball Association como membro da Divisão Noroeste da Conferência Oeste. Fundada em 1989, a equipe pertence a Glen Taylor, que também é dono do Minnesota Lynx da WNBA."},
    "1610612740": { "Name": "New Orleans Pelicans",
                    "Conference": "Western Conference",
                    "Description": "O New Orleans Pelicans é um time de basquete da National Basketball Association localizado em Nova Orleães, Louisiana. O time se estabeleceu em 2002 como New Orleans Hornets, originado da relocação do Charlotte Hornets e sendo o primeiro time em Nova Orleães desde a saída do atual Utah Jazz em 1979. "},
    "1610612752": { "Name": "New York Knicks",
                    "Conference": "Eastern Conference",
                    "Description": "O New York Knickerbockers, mais comumente chamados de New York Knicks, é um time de basquete profissional americano baseado no bairro de Manhattan em Nova York. Os Knicks competem na National Basketball Association como um membro da Divisão do Atlântico da Conferência Leste."},
    "1610612760": { "Name": "Oklahoma City Thunder",
                    "Conference": "Western Conference",
                    "Description": "O Oklahoma City Thunder é um time norte-americano de basquete profissional com sede em Oklahoma City. O Thunder compete na National Basketball Association como membro da Divisão Noroeste da Conferência Oeste da liga. A equipe joga seus jogos em casa no Paycom Center."},
    "1610612753": { "Name": "Orlando Magic",
                    "Conference": "Eastern Conference",
                    "Description": "O Orlando Magic é um time norte-americano de basquete profissional com sede em Orlando, Flórida. O Magic compete na National Basketball Association como membro da Divisão Sudeste da Conferência Leste. A franquia foi criada em 1989 como uma franquia de expansão."},
    "1610612753": { "Name": "Philadelphia 76ers",
                    "Conference": "Eastern Conference",
                    "Description": "O Philadelphia 76ers é um time de basquete profissional norte-americano baseado na área metropolitana da Filadélfia. Os 76ers competem na National Basketball Association como membro da Conferência Leste na Divisão do Atlântico e jogam no Wells Fargo Center."},
    "1610612756": { "Name": "Phoenix Suns",
                    "Conference": "Western Conference",
                    "Description": "Phoenix Suns é uma equipe de basquete da National Basketball Association sediada em Phoenix, Arizona. Sua arena se chama Footprint Center. A equipe foi fundada em 1968 e nunca conseguiu um campeonato da liga, chegando a vice-campeonatos em 1976,1993 e 2021."},
    "1610612757": { "Name": "Portland Trail Blazers",
                    "Conference": "Western Conference",
                    "Description": "Portland Trail Blazers é um time de basquete da National Basketball Association localizado na cidade de Portland, Oregon. O time foi fundado em 1970 e as cores do uniforme são vermelho, branco, prata e preto. A dona do time é Jody Patton, e o ginásio é o Moda Center. Os Blazers foram campeões da NBA em 1977."},
    "1610612759": { "Name": "San Antonio Spurs",
                    "Conference": "Western Conference",
                    "Description": "San Antonio Spurs é um time de basquete da National Basketball Association localizado em San Antonio, Texas. As cores do uniforme são preto, prata e branco."},
    "1610612761": { "Name": "Toronto Raptors",
                    "Conference": "Eastern Conference",
                    "Description": "O Toronto Raptors é um time de basquete profissional canadense sediado em Toronto, Ontário. Os Raptors competem na National Basketball Association como um clube membro da Conferência Leste e Divisão do Atlântico."},
    "1610612762": { "Name": "Utah Jazz",
                    "Conference": "Western Conference",
                    "Description": "Utah Jazz é um time de basquete da National Basketball Association situado em Salt Lake City, Utah."},
    "1610612764": { "Name": "Washington Wizards",
                    "Conference": "Eastern Conference",
                    "Description": "O Washington Wizards é um time norte-americano de basquete profissional com sede em Washington, D.C. Os Wizards competem na National Basketball Association como membro da Divisão Sudeste da Conferência Leste. A equipe joga seus jogos em casa na Capital One Arena."}
}

const table_body = document.getElementById("roster_table_body");
const stats_body = document.getElementById("stats_table_body");

var team;
var team_players;
var team_stats = {
    "apg": -1,
    "bpg": -1,
    "fgp": -1,
    "ftp": -1,
    "pfpg": -1,
    "ppg": -1,
    "spg": -1,
    "tpg": -1,
    "tpp": -1,
    "trpg": -1,
};

async function team_main() {
    var current_user = window.location.href
    var teamId = current_user.substring(current_user.lastIndexOf("=") + 1 , current_user.length)

    // Get Teams Info
    team = await getTeam(teamId);

    // Create Team Page
    createTeamPage();

    // Create Roster Table
    await createRosterTable();

    // Create Stats Section
    createStatsSection();

}

/* Function to Retrieve all Teams Info */

async function getTeam(teamId) {
    var data;

    await fetch(api_url + "teams.json")
    .then(async function(response) {
        var json = await response.json();
        var duplicated_data = [...json.league.sacramento, ...json.league.standard, ...json.league.utah, ...json.league.vegas];

        for (let i = 0; i< duplicated_data.length; i++) {
            if (duplicated_data[i].teamId == teamId)  {
                data = duplicated_data[i]
                return
            }
        }
    })
    return data

}

/* Function to Update each field in Team Profile Page */

function createTeamPage() {
    document.getElementById("team_logo_img").setAttribute("src", "assets/img/logos/" + team.fullName + ".png")
    document.getElementById("team_name_h2").innerHTML = teams_id_dict[team.teamId].Name  
    document.getElementById("team_conference_h3").innerHTML = teams_id_dict[team.teamId].Conference

    document.getElementById("div_id_text").innerHTML = team.teamId
    document.getElementById("div_fullname_text").innerHTML = team.fullName
    document.getElementById("div_teamshortname_text").innerHTML = team.teamShortName
    document.getElementById("div_nickname_text").innerHTML = team.nickname
    document.getElementById("div_tricode_text").innerHTML = team.tricode
    document.getElementById("p_description_text").innerHTML = teams_id_dict[team.teamId].Description
}

/* Function to create Roster Team Table */

async function createRosterTable() {
    team_players = await getPlayersByTeam(team.teamId)

    for (let i = 0; i<team_players.length; i++) {

        var new_tr = document.createElement("tr");

        var new_th = document.createElement("th");
        new_th.setAttribute("scope", "row");
        new_th.innerHTML = team_players[i].personId;

        var new_td1 = document.createElement("td");
        new_td1.innerHTML = team_players[i].firstName

        var new_td2 = document.createElement("td");
        new_td2.innerHTML = team_players[i].lastName

        var new_td3 = document.createElement("td");
        new_td3.innerHTML = team_players[i].pos

        var new_td4 = document.createElement("td");
        new_td4.innerHTML = team_players[i].jersey

        new_tr.appendChild(new_th);
        new_tr.appendChild(new_td1);
        new_tr.appendChild(new_td2);
        new_tr.appendChild(new_td3);
        new_tr.appendChild(new_td4);
        table_body.appendChild(new_tr);

    }
}




/* Function to Retrieve Players From Specific Team */

async function getPlayersByTeam(teamId) {
    var data = [];

    await fetch(api_url + "players.json")
    .then(async function(response) {
        var json = await response.json();
        var duplicated_data = [...json.league.sacramento, ...json.league.standard, ...json.league.utah, ...json.league.vegas];

        var players_already_added = new Set();
        for (let i = 0; i< duplicated_data.length; i++) {
            // Remove duplicated players
            if (!(players_already_added.has(duplicated_data[i].personId)) && (duplicated_data[i].teamId in teams_id_dict))  {

                if (duplicated_data[i].teamId == teamId) {
                    data.push(duplicated_data[i])
                    players_already_added.add(duplicated_data[i].personId)
                }
            }
        }
    })

    return data;

}



/* Function to Create Stats Section */

async function createStatsSection() {
    await getStats();

    console.log(team_players)
    for (let key in team_stats) {  

        var stat_player_winner
        for (let i = 0; i<team_players.length;i++) {
            if (team_players[i].personId == team_stats[key]["personId"])    stat_player_winner = team_players[i]
        }

        var new_tr = document.createElement("tr");

        var new_th = document.createElement("th");
        new_th.setAttribute("scope", "row");
        new_th.innerHTML = key;

        var new_td1 = document.createElement("td");
        new_td1.innerHTML = stat_player_winner["firstName"]

        var new_td2 = document.createElement("td");
        new_td2.innerHTML = stat_player_winner["lastName"]

        var new_td3 = document.createElement("td");
        new_td3.innerHTML = team_stats[key]["value"]

        new_tr.appendChild(new_th);
        new_tr.appendChild(new_td1);
        new_tr.appendChild(new_td2);
        new_tr.appendChild(new_td3);
        stats_body.appendChild(new_tr);


    }
}


/* Function to Retrieve Stats From Specific Team */

async function getStats() {

    await fetch(api_url + "teams/" + team.urlName + "/leaders.json")
    .then(async function(response) {
        var json = await response.json();

        for (key in json.league.africa) {
            if (key != "seasonStageId" && (team_stats[key] == -1 || team_stats[key] == undefined) && json.league.africa[key] != []) {
                team_stats[key] = json.league.africa[key][0];
            } 
        }

        for (key in json.league.sacramento) {
            if (key != "seasonStageId" && (team_stats[key] == -1 || team_stats[key] == undefined) && json.league.sacramento[key] != undefined) {
                team_stats[key] = json.league.sacramento[key][0];
            } 
        }

        for (key in json.league.standard) {
            if (key != "seasonStageId" && (team_stats[key] == -1 || team_stats[key] == undefined) && json.league.standard[key] != undefined) {
                team_stats[key] = json.league.standard[key][0];
            } 
        }

        for (key in json.league.utah) {
            if (key != "seasonStageId" && (team_stats[key] == -1 || team_stats[key] == undefined) && json.league.utah[key] != undefined) {
                team_stats[key] = json.league.utah[key][0];
            } 
        }

        for (key in json.league.vegas) {
            if (key != "seasonStageId" && (team_stats[key] == -1 || team_stats[key] == undefined) && json.league.vegas[key] != undefined) {
                team_stats[key] = json.league.vegas[key][0];
            } 
        }
        
    })

}