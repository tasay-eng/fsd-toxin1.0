import '../plus-minus/plus-minus.js'
var sel = Array.from(document.querySelectorAll(".drop-down"))
console.log(sel)
for (let i of sel){
    i.addEventListener("mousedown", appear(e))
}
function appear(e){
    let drop = e.target.lastChild
    drop.style.display= 'block'
}