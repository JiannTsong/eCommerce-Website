let d=new Date();
let yr=d.getFullYear();
let syr=yr.toString();
let mon=d.getMonth();
let smon = mon.toString(); 
let day = d.getDate(); 
let sday = day.toString(); 
let time = syr.concat(smon, sday);

let SearchConfig = '<script type="text/javascript" src="./assets/js/plugins/SearchConfig.js?'+time+'"></script>';

$("body").append(SearchConfig);