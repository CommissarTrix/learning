const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el)	
function prikol(){
    alert('ЛОВУШКА ДЖОКУШКЕРА')
}
function print_shoe(){
    $('#main').style.display ="none"
    $('#shoe_section').style.display="block"
}
function print_main(){
    $('#main').style.display = 'block';
    $('#shoe_section').style.display = 'none'
}