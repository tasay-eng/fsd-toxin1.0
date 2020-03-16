var inp = document.querySelectorAll(".star-rating__input")
var icons = document.querySelectorAll(".star-rating__ico")
function change_stars(e){
    let val = parseInt(e.target.value)
    if (icons[val-1].classList.contains("far")){
        for ( let j= 0; j < val; j++){
            icons[j].classList.add("fas");
            icons[j].classList.remove("far");
        }
    }
    else if (val < 5) { 
        if (icons[val].classList.contains("fas")) {
            for ( let j= val-1; j < 5; j++){
                icons[j].classList.add("far");
                icons[j].classList.remove("fas");
            }    
       }        
    }  
}
for (let i of inp) {
    i.addEventListener("click", change_stars)
}
