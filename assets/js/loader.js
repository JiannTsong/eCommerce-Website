let d=new Date();
let yr=d.getFullYear();
let syr=yr.toString();
let mon=d.getMonth();
let smon = mon.toString(); 
let day = d.getDate(); 
let sday = day.toString(); 
let time = syr.concat(smon, sday);

let firebase = '<script src="./assets/js/firebase/firebase.js?'+time+'"></script>';
let SearchConfig = '<script type="text/javascript" src="./assets/js/plugins/SearchConfig.js?'+time+'"></script>';

$("html").append(firebase);
$("html").append(SearchConfig);