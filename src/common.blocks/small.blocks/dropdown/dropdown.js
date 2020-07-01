import '../plus-minus/plus-minus.js'
const drop = document.querySelectorAll(".drop-field")
const drop_body = document.querySelectorAll(".drop-body")
const nums_guests = document.querySelectorAll(".input-amount")
const plus = document.querySelectorAll(".plus")
const minus = document.querySelectorAll(".minus")
const choice = document.querySelectorAll(".choice")

let plus_dev = devide(plus)
let minus_dev = devide(minus)
let nums_guests_dev = devide(nums_guests)
let choice_dev = devide(choice)

let drop_change = [...drop]
for (let k in drop_change){
    drop_change[k].addEventListener("click", appear)
}

for(let k in nums_guests_dev){
    listen(nums_guests_dev[k], k)
}

function listen(arr_part, k){
    arr_part.forEach((elem, index)=>{
        elem.addEventListener("input", (e)=>{
            let res=''
            res+=show_choice(elem, k, index)
        })
    })
}

 function devide(arr_like){
    let res = [];
    let p = [];
    [...arr_like].map((elem, index)=>{
        if((index+1)%3===0){
            p.push(elem)
            res.push(p)
            p=[]
        }
        else{
            p.push(elem)
        }
    });
    return res
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

function show_choice(elem, k, index){
    let res=''
    if(elem.value > 0){
        res= choice_dev[k][index].textContent+elem.value
    }
    console.log(res)
}
function show(field, k){
    let res = ''
    for(let i in choice_dev[k]) {
        res+= choice_dev[k][i]+nums_guests_dev[k][i]
    }
    field.textContent = res
}


