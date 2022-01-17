const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el)	
let url = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=82f6e4e93ef9f6b021c0c9b2bd8b6459'

async function getData(city){
    let curret_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=82f6e4e93ef9f6b021c0c9b2bd8b6459`
    let response = await fetch(curret_url);
	let res = await response.json();
    console.log(res)
    console.log(city)
    $('#curret_city').innerHTML = res.name 
    // $('#today_heading').innerHTML = 'Today ,' +
    let avg_temp = Math.round((res.main.temp_max + res.main.temp_min)/2)
    $('#today_weather_temperature').innerHTML = avg_temp 
    switch(res.weather[0].description){
        case 'overcast clouds': $('#weather_icon').src="images/cloudy2.png";
        break;
        case "clear sky": $('#weather_icon').src="images/sunny.png";
        break;
        case "light rain": $('#weather_icon').src="images/rain.png";
        break;
        default: $('#weather_icon').src="images/cloudy.png";
    }
    $('#today_weather_clouds').innerHTML = res.weather[0].description
    $('#today_wind').innerHTML = Math.round(res.wind.speed) + ' km/h'
    $('#today_hum').innerHTML = res.main.humidity + ' %'
    let now = new Date()
    let today = [now.getDate(),0]
    switch(now.getMonth()){
        case 0: today[1] = 'Янв'
        break;
        case 1: today[1] = 'Фев'
        break;
        case 2: today[1] = 'Март'
        break;
        case 3: today[1] = 'Апр'
        break;
        case 4: today[1] = 'Май'
        break;
        case 5: today[1] = 'Июнь'
        break;
        case 6: today[1] = 'Июль'
        break;
        case 7: today[1] = 'Авг'
        break;
        case 8: today[1] = 'Сент'
        break;
        case 9: today[1] = 'Окт'
        break;
        case 10: today[1] = 'Нояб'
        break;
        case 11: today[1] = 'Дек'
        break;
    }
    $('#today_heading').innerHTML = 'Сегодня ' + today[0] + ' ' + today[1]
    $('#today_heading2').innerHTML = today[1] + ' ' + today[0]
    addRecent(city)
}
let recentSearch = ['Paris','Kazan','Perm']
function addRecent(city){
    recentSearch.pop()
    recentSearch.splice(0,0,city)
    printRecent()
}
function printRecent(){
    $('#recent1').innerHTML = recentSearch[0]
    $('#recent2').innerHTML = recentSearch[1]
    $('#recent3').innerHTML = recentSearch[2]
}
printRecent()
window.onload = getData('Moscow')

