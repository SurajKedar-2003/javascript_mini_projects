const accrodians = document.querySelectorAll(".accrodian");

accrodians.forEach(accrodian =>{
    const icon = accrodian.querySelector(".icon");
    const answer = accrodian.querySelector(".answer");

    accrodian.addEventListener('click', ()=>{
    
        if(icon.classList.contains("active")){
            icon.classList.remove('active');
            answer.style.maxHeight = null;

        }else{
            icon.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

    
        
    })
})
