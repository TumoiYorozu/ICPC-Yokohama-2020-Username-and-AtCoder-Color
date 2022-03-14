// ==UserScript==
// @name         ICPC Username and AtCoder Color
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       TumoiYorozu
// @match        https://icpcsec.firebaseapp.com/standings/
// @grant        none
// @updateURL    https://github.com/TumoiYorozu/ICPC-Yokohama-2020-Username-and-AtCoder-Color/raw/main/ICPC-Yokohama-2020-Username.user.js
// ==/UserScript==


function main() {
    console.log("main")
    var matches = document.querySelectorAll(".team-row");
    if(matches.length == 0){
        setTimeout(main, 300);
        return;
    }
    fetch("https://raw.githubusercontent.com/TumoiYorozu/ICPC-Yokohama-2020-Username-and-AtCoder-Color/main/asia_teams.json", {cache: "no-store"}).then(res => {res.json().then(team_dic => {
        for(const e of matches){
            var a = e.querySelector("div.team-right > div.team-col.team-name > span");
            if(a == null){
                a = e.querySelector("div > h4");
            }
            if(a == null) continue;
            var tname = a.innerText.split("\n")[0];
            if(tname in team_dic){
                //a.innerHTML += "<br>" + team_dic[tname]
                a.innerHTML = a.innerHTML.replace(tname, tname + "<br>" + team_dic[tname])
            }
        }
        for(let e of document.getElementsByClassName('user-red'    )){e.style.color="#FF0000"};
        for(let e of document.getElementsByClassName('user-orange' )){e.style.color="#FF8000"};
        for(let e of document.getElementsByClassName('user-yellow' )){e.style.color="#C0C000"};
        for(let e of document.getElementsByClassName('user-blue'   )){e.style.color="#0000FF"};
        for(let e of document.getElementsByClassName('user-cyan'   )){e.style.color="#00C0C0"};
        for(let e of document.getElementsByClassName('user-green'  )){e.style.color="#008000"};
        for(let e of document.getElementsByClassName('user-brown'  )){e.style.color="#804000"};
        for(let e of document.getElementsByClassName('user-gray'   )){e.style.color="#808080"};
        for(let e of document.getElementsByClassName('user-unrated')){e.style.color="#000000"};
        for(let e of document.getElementsByClassName('user-admin'  )){e.style.color="#C000C0"};
    }).catch(e => {
        setTimeout(main, 3000);
    }).catch(e => {
        setTimeout(main, 3000);
    })})
}


(function() {
    'use strict';
    // Your code here...

    setTimeout(main, 500);
})();

