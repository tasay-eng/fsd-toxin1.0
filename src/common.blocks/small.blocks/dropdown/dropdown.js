import '../plus-minus/plus-minus.js'
const drop = document.querySelectorAll(".drop-field")
const drop_h = document.querySelectorAll(".drop-field")
const drop_body = document.querySelectorAll(".drop-body")
const nums_guests = document.querySelectorAll(".input-amount")
const plus = document.querySelectorAll(".plus")
const minus = document.querySelectorAll(".minus")
const signs = plus.concat(minus)
console.log(drop)
console.log(drop_h)
for (let i of drop){
    i.addEventListener("click", appear)
}
for (let i of drop_h){
    i.addEventListener("click", appear)
}
for (let i in signs){
    signs[i].addEventListener("click", show_choice)
}
function appear(e){
    let a = e.target.parentNode.lastChild
    if(a.className === 'drop-body'){
        if (a.style.display === 'none') {
            a.style.display= 'block'
        }
        else {
            a.style.display= 'none'
        }
    }
} 

function show_choice(e){
    if (e.target){
        let nums_guests = document.querySelectorAll(".input-amount")
        for (let j of nums_guests){
            if(j>0){
                e.target.parentNode.firstChild.textContent = e.target.firstChild.textContent
            }
        }
    }
}


