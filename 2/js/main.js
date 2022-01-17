const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el)	

function hide_services(){
	document.getElementById("grid_vklad").style.backgroundColor='white'
	document.getElementById("grid_credit").style.backgroundColor='white'
	document.getElementById("grid_strah").style.backgroundColor='white'
	document.getElementById("grid_services").style.backgroundColor='white'
}
function print_service(service){
	hide_services()
	document.getElementById(service).style.backgroundColor="#F6F7FF"
	if (service == 'grid_vklad'){
		$('#grid_second__item_left_h3').innerHTML = "Вклады Лига Банка – это выгодная инвестиция в свое будущее";
		$('#grid_second__item_left_ul').innerHTML = "<li id='grid_second__item_left_li1'></li><li id='grid_second__item_left_li2'></li><li id='grid_second__item_left_li3'></li>"
		$('#grid_second__item_left_li1').innerHTML = "Проценты по вкладам до 7%";
		$('#grid_second__item_left_li2').innerHTML = "Разнообразные условия";
		$('#grid_second__item_left_li3').innerHTML = "Возможность ежемесячной капитализации или вывод процентов на банковскую карту";
		$('#grid_second__item_left_btn_cont').innerHTML = "<button id='grid_second__item_left_btn' onclick='window.location.href='>Узнать подробнее</button>"
		$('#grid_second__item_right_img').src="img/piggybank.png"
	}
	if (service == 'grid_credit'){
		$('#grid_second__item_left_h3').innerHTML = "Лига Банк выдает кредиты под любые цели";
		$('#grid_second__item_left_ul').innerHTML = "<li id='grid_second__item_left_li1'></li><li id='grid_second__item_left_li2'></li><li id='grid_second__item_left_li3'></li>"
		$('#grid_second__item_left_li1').innerHTML = "Ипотечный кредит";
		$('#grid_second__item_left_li2').innerHTML = "Автокредит";
		$('#grid_second__item_left_li3').innerHTML = "Потребительский кредит";
		$('#grid_second__item_right_img').src="img/car1.png"
	}
	if (service == 'grid_strah'){
		$('#grid_second__item_left_h3').innerHTML = "Лига Страхование — застрахуем все что захотите";
		$('#grid_second__item_left_ul').innerHTML = "<li id='grid_second__item_left_li1'></li><li id='grid_second__item_left_li2'></li><li id='grid_second__item_left_li3'></li>"
		$('#grid_second__item_left_li1').innerHTML = "Автомобильное страхование";
		$('#grid_second__item_left_li2').innerHTML = "Страхование жизни и здоровья";
		$('#grid_second__item_left_li3').innerHTML = "Страхование недвижимости";
		$('#grid_second__item_right_img').src="img/lock.png"
	}
	if (service == 'grid_services'){
		$('#grid_second__item_left_h3').innerHTML = "Лига Банк — это огромное количество онлайн-сервисов для вашего удобства";
		$('#grid_second__item_left_ul').innerHTML = "<li id='grid_second__item_left_li1'></li><li id='grid_second__item_left_li2'></li>"
		$('#grid_second__item_left_li1').innerHTML = "Мобильный банк, который всегда под рукой";
		$('#grid_second__item_left_li2').innerHTML = "Приложение Лига-проездной позволит вам оплачивать билеты по всему миру";
		$('#grid_second__item_right_img').src="img/phone.png"
	}
}
function calc(procent){
	let cost = $('#calc_cost').value
	let res = cost * procent / 100
	$('#calc_rez').value = res
}