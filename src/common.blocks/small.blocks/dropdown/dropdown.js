import '../plus-minus/plus-minus.js'
const drop = document.querySelectorAll(".drop-down_common")
const drop_h = document.querySelectorAll(".drop-down_hidden")
console.log(drop)
console.log(drop_h)
for (let i of drop){
    i.addEventListener("click", appear)
}
for (let i of drop_h){
    i.addEventListener("click", appear)
}
function appear(e){
    let a = e.target.parentNode.lastChild
    console.log(a)
    console.log(e.target)
    console.log(e.target.parentNode)
    console.log(a.style.display)
    if (a.style.display === 'none') {
        a.style.display= 'block'
    }
    else {
        a.style.display= 'none'
    }
}  