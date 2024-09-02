const date_box = document.getElementById('date');
const container = document.querySelector('.container')
date_box.max = new Date().toISOString().split("T")[0];
const output_box = document.querySelector('.output_box');
document.getElementById('calculate').addEventListener('click', calculateAge)

function calculateAge(){
    let birthDate = new Date(date_box.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let y3, m3, d3;
    y3 = y2 - y1;

    if(m2 >= m1){
        m3 = m2 -m1;
    }else{
        y3--;
        m3 = 12 + m2 - m1;
    }

    if(d2 >= d1){
        d3 = d2 - d1;
    }else{
        m3--;
        d3 = getDayInMonth(y1, m1) + d2 - d1;
    }

    if(m3 < 0){
        m3 = 11;
        y3--;
    }

    output_box.innerHTML = `Your are <span>${y3}</span> years <span>${m3}</span> months <span>${d3}</span> days old`
    
}

function getDayInMonth(year, month){
    return new Date(year, month, 0).getDate();
}