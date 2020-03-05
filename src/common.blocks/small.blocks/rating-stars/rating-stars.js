var inp = document.querySelectorAll(".star-rating__input")
var icons = document.querySelectorAll(".star-rating__ico")
var n = inp.length
inp.forEach(function(elem, ind) {
    elem.addEventListener("click", function (e){
        for (let j = 0; j <= 4; j++){
            if (elem.checked){
                icons[j].classList.remove("far");
                icons[j].classList.add("fas");
                console.log(icons[j].classList)
            } else {
                icons[j].classList.remove("fas");
                icons[j].classList.add("far");
                console.log(icons[j].classList)     
            }
        }  
    
})})
