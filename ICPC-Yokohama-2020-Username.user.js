// ==UserScript==
// @name         ICPC Yokohama 2020 Username and AtCoder Color
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       TumoiYorozu
// @match        https://icpcsec.firebaseapp.com/standings/
// @grant        none
// @updateURL    https://github.com/TumoiYorozu/ICPC-Yokohama-2020-Username-and-AtCoder-Color/raw/main/ICPC-Yokohama-2020-Username.user.js
// ==/UserScript==

const team_dic = {
    'ATELIER'       :'毎日進捗, <a href="https://atcoder.jp/users/qLethon"><span class="user-blue">qLethon</span></a>, <a href="https://atcoder.jp/users/bin101"><span class="user-yellow">bin101</span></a>',
    'nowcow'        :'<a href="https://atcoder.jp/users/olphe"><span class="user-orange">olphe</span></a>, ferin, <a href="https://atcoder.jp/users/Div9851"><span class="user-blue">Div9851</span></a>',
    'The atama'     :'<a href="https://atcoder.jp/users/Mister"><span class="user-orange">mister</span></a>, <a href="https://atcoder.jp/users/Enjapma"><span class="user-orange">enjapma</span></a>, <a href="https://atcoder.jp/users/okura"><span class="user-blue">okura</span></a>',     
    'UHISHIRO'      :'<a href="https://atcoder.jp/users/siro53"><span class="user-blue">siro53</span></a>, <a href="https://atcoder.jp/users/suta"><span class="user-yellow">suta</span></a>, <a href="https://atcoder.jp/users/kiyoshi0205"><span class="user-yellow">kiyoshi0205</span></a>',
    'harahara'      :'<a href="https://atcoder.jp/users/stoq"><span class="user-yellow">stoq</span></a>, <a href="https://atcoder.jp/users/hanyu"><span class="user-blue">hanyu</span></a>, <a href="https://atcoder.jp/users/momohara"><span class="user-blue">momohara</span></a>',
    'onions'        :'jupiro, <a href="https://atcoder.jp/users/kuhaku"><span class="user-yellow">kuhaku</span></a>, <a href="https://atcoder.jp/users/kotamanegi"><span class="user-orange">kotamanegi</span></a> (<a href="https://atcoder.jp/users/Badlylucky"><span class="user-cyan">Badlylucky</span></a>)',
    'Aobayama_sugarstep'    :'<a href="https://atcoder.jp/users/mine691"><span class="user-cyan">mine691</span></a>, <a href="https://atcoder.jp/users/ha15"><span class="user-blue">ha15</span></a>, <a href="https://atcoder.jp/users/tarakojo1019"><span class="user-blue">tarakojo1019</span></a>',
    'noborito290yen'        :'<a href="https://atcoder.jp/users/mint"><span class="user-blue">mint</span></a>, <a href="https://atcoder.jp/users/longrun"><span class="user-cyan">longrun</span></a>, <a href="https://atcoder.jp/users/shop_one"><span class="user-blue">shop_one</span></a> (<a href="https://atcoder.jp/users/Ti11192916"><span class="user-cyan">Ti11192916</span></a>)',
    'good_yamikin'  :'baton, <a href="https://atcoder.jp/users/mikit"><span class="user-yellow">mikit</span></a>, <a href="https://atcoder.jp/users/tatyam"><span class="user-red">tatyam</span></a>',
    'Heno World'    :'<a href="https://atcoder.jp/users/heno239"><span class="user-red">heno239</span></a>, <a href="https://atcoder.jp/users/yamunaku"><span class="user-orange">yamunaku</span></a>, <a href="https://atcoder.jp/users/moririn2528"><span class="user-orange">moririn2528</span></a>',
    'Flip-Flop C'   :'<a href="https://atcoder.jp/users/ntk_ta01"><span class="user-cyan">ntk_ta01</span></a>, oldlick_tech, <a href="https://atcoder.jp/users/miiifa"><span class="user-green">miiifa</span></a>',
    'NITTC_overslept'       :'<a href="https://atcoder.jp/users/car4ryu"><span class="user-gray">car4ryu</span></a>, <a href="https://atcoder.jp/users/hamuhei4869"><span class="user-cyan">hamuhei4869</span></a>, <a href="https://atcoder.jp/users/shibh308"><span class="user-yellow">shibh308</span></a>',
    '___ KING ___'  :'<a href="https://atcoder.jp/users/yutaka1999"><span class="user-red">yutaka1999</span></a>, <a href="https://atcoder.jp/users/maroonrk"><span style="color:#869120;">maroonrk</span></a>, HIR180 (<a href="https://atcoder.jp/users/DEGwer"><span class="user-red">DEGwer</span></a>)',
    'tsutaj'        :'rsk0315_h4x, monkukui2, _____TAB_____ (_sono_8_)',
    'Poyashi'       :'<a href="https://atcoder.jp/users/noshi91"><span class="user-red">noshi91</span></a>, メンバー2, メンバー3',
    'appeared'      :'<a href="https://atcoder.jp/users/asdf1"><span class="user-blue">asdf1</span></a>, <a href="https://atcoder.jp/users/ecasdqina"><span class="user-yellow">ecasdqina</span></a>, <a href="https://atcoder.jp/users/shinchan"><span class="user-blue">shinchan</span></a>',
    'Aobayama_dropout'      :'<a href="https://atcoder.jp/users/kotatsugame"><span class="user-orange">kotatsugame</span></a>, <a href="https://atcoder.jp/users/Yukly"><span class="user-blue">Yukly</span></a>, <a href="https://atcoder.jp/users/AokabiC"><span class="user-blue">AokabiC</span></a>',
    'seica on the border'   :'<a href="https://atcoder.jp/users/seica"><span class="user-yellow">seica</span></a>, <a href="https://atcoder.jp/users/m_99"><span class="user-orange">m_99</span></a>, <a href="https://atcoder.jp/users/shi"><span class="user-blue">shi</span></a>',
    'niu_mogu_mogu' :'<a href="https://atcoder.jp/users/niuez"><span class="user-blue">niuez</span></a>, <a href="https://atcoder.jp/users/playroller"><span class="user-cyan">playroller</span></a>, <a href="https://atcoder.jp/users/ugis"><span class="user-cyan">ugis</span></a>',       
    'HiCoder'       :'オータム, メンバー2, メンバー3',
    'CEDARY'        :'<a href="https://atcoder.jp/users/xuelei"><span class="user-blue">xuelei</span></a>, <a href="https://atcoder.jp/users/untiunti"><span class="user-cyan">untiunti</span></a>, <a href="https://atcoder.jp/users/hango"><span class="user-green">hango</span></a>',      
    'QWE_QWE'       :'<a href="https://atcoder.jp/users/Rubikun"><span class="user-orange">Rubikun</span></a>, <a href="https://atcoder.jp/users/risujiroh"><span class="user-orange">risujiroh</span></a>, <a href="https://atcoder.jp/users/kort0n"><span class="user-red">kort0n</span></a> (<a href="https://atcoder.jp/users/DEGwer"><span class="user-red">DEGwer</span></a>)',
    'Antitled'      :'tute7627, <a href="https://atcoder.jp/users/maze1230"><span class="user-yellow">maze1230</span></a>, <a href="https://atcoder.jp/users/spd_9x2"><span class="user-yellow">SPD_9X2</span></a>',
    'Naphi' :'<a href="https://atcoder.jp/users/nasatame"><span class="user-blue">nasatame</span></a>, <a href="https://atcoder.jp/users/phocom"><span class="user-yellow">phocom</span></a>, <a href="https://atcoder.jp/users/firiexp"><span class="user-yellow">firiexp</span></a>',       
    'O-Jaws'        :'<a href="https://atcoder.jp/users/kanade9"><span class="user-brown">kanade9</span></a>, <a href="https://atcoder.jp/users/reud"><span class="user-cyan">reud</span></a>, <a href="https://atcoder.jp/users/tunehira"><span class="user-cyan">tunehira</span></a>',      
    'inherited nya-n'       :'<a href="https://atcoder.jp/users/fukubutyo"><span class="user-blue">fukubutyo</span></a>, <a href="https://atcoder.jp/users/keep_OC"><span class="user-cyan">keep_OC</span></a>, <a href="https://atcoder.jp/users/sakarush"><span class="user-green">sakarush</span></a> (<a href="https://atcoder.jp/users/spica314"><span class="user-blue">spica314</span></a>)',
};

function main() {
    console.log("main")
    const matches = document.querySelectorAll("#root > div > div.container > div > div.standard-standings > div:nth-child(3) > div > div");
    if(matches.length == 0){
        setTimeout(main, 300);
    }else{
        for(const e of matches){
            var a = e.querySelector("div > div.team-right > div.team-col.team-name > span");
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
    }
}


(function() {
    'use strict';
    // Your code here...

    setTimeout(main, 500);
})();
