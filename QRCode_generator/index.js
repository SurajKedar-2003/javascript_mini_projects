let input_box = document.getElementById('qr_text');
let qr_div = document.querySelector('.qr_div');
let button = document.getElementById('generate');
let qrImg = document.getElementById('qr_img');

console.log(input_box.value);

button.addEventListener('click', ()=>{
    if(input_box.length>0){
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input_box.value}`

    }else{
        input_box.classList.add('error');
        setTimeout(() => {
            input_box.classList.remove('error');
        }, 1000);
    }
    
});
