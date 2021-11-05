// ==UserScript==
// @name         ICPC Yokohama 2020 Username and AtCoder Color
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       TumoiYorozu
// @match        https://icpcsec.firebaseapp.com/standings/
// @grant        none
// @updateURL    https://github.com/TumoiYorozu/ICPC-Yokohama-2020-Username-and-AtCoder-Color/raw/main/ICPC-Yokohama-2020-Username.user.js
// ==/UserScript==


function main() {
    console.log("main")
    var tables = document.getElementsByTagName("table")
    var run = 0;
    for(const t of tables){
        var txt = t.innerHTML;
        if(txt.indexOf("Nickname & IDs") >= 0) {
            run = 0;
            break;
        }
        if(txt.indexOf("nickname") >= 0) {
            run = 1;
        }
        break;
    }
    if (run == 1) {
        fetch("https://raw.githubusercontent.com/TumoiYorozu/ICPC-Yokohama-2020-Username-and-AtCoder-Color/main/asia_teams.json", {cache: "no-store"}).then(res => {res.json().then(team_dic => {
            var tables = document.getElementsByTagName("table")
            for(const t of tables){
                var txt = t.innerHTML;
                for(const tname of Object.keys(team_dic)){
                    txt = txt.replace(tname, tname + "<br>" + team_dic[tname])
                }
                txt = txt.replace("nickname", "Nickname & IDs")
                t.innerHTML = txt;
                break;
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
            //setTimeout(main, 3000);
        }).catch(e => {
            //setTimeout(main, 3000);
        })})
    }
    setTimeout(main, 1000);
}


(function() {
    'use strict';
    // Your code here...

    setTimeout(main, 500);
})();

