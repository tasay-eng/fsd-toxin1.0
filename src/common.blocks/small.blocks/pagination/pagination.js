var room_card = document.querySelectorAll(".room-card");
var cards_num = room_card.length; //всего записей
var cards_show = 12; //сколько отображаем сначала
var pages_show = Math.ceil(cards_num / cards_show); //кол-во страниц

//выводим список страниц
var paginator = document.querySelector(".paginator");
var page = "";
for (var i = 0; i < pages_show; i++) {
  if (i===0){
    page += "<i id='skipper-page-1' class=\"fas fa-arrow-left\"></i>";
    page += "<span class=pagin-page data-page=" + (i+1) + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
  }
  else if (i===pages_show-1){
    page += "<span class=pagin-page data-page=" + (i+1) + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
    page += "<i id='skipper-page-2'class=\"fas fa-arrow-right\"></i>";
  } 
  else{
  page += "<span class=pagin-page data-page=" + (i+1) + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
}
}
paginator.innerHTML = page;

//выводим первые записи {cards_show}
var room_card = document.querySelectorAll(".room-card");
for (var i = cards_show; i < cards_num; i++) {
    room_card[i].style.display = "none";
}
var pages = document.querySelectorAll(".pagin-page");
var main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");

//листаем
function pagination(e) {
  var target = e.target;
  var id = target.id;
  
  if (target.tagName != "SPAN" && target.tagName != "I") return;
  
  if (id==='skipper-page-1'){
    if(main_page.id==="page1") return;
    else{
      main_page.classList.remove("paginator_active");
      main_page = main_page.previousSibling;
    }
  }
  else if (id==='skipper-page-2') {
    if (main_page.nextSibling.id==='skipper-page-2') return;
    else{
      main_page.classList.remove("paginator_active");
      main_page = main_page.nextSibling;
    }
  }
  else {
    main_page.classList.remove("paginator_active");
    main_page = target;
  }
  main_page.classList.add("paginator_active");
  var need_num = main_page.dataset.page;

  var max_card = need_num * cards_show
  var min_card = max_card - cards_show

  for (var i = 0; i < cards_num; i++) {
    if (i < min_card || i >= max_card){
      room_card[i].style.display = "none";
    }
    else {
      room_card[i].style.display = "block";
    }
  }
}

paginator.addEventListener('click', pagination)