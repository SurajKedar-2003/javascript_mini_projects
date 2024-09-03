const nav_buttons = document.querySelector('.nav_buttons');
const employee_card = document.querySelector('.employee_card');
const add_employee_modal = document.querySelector('.add_employee_modal');
let employee_form = document.getElementById('addForm');
let allInput = employee_form.querySelectorAll("INPUT");
let employee_list = document.querySelector('.employee_list');
let modal_heading = document.querySelector('.modal_heading');
let searchbar = document.getElementById('search_bar');

let allEmployeeData = [];
let url = '';

//check local storage is null or it has data
if(localStorage.getItem("allEmployeeData") != null){
    allEmployeeData = JSON.parse(localStorage.getItem('allEmployeeData'));
    console.log('Loaded data from localStorage:', allEmployeeData); 
}

//get employee data
let getEmployeeData = ()=>{
    employee_list.innerHTML = '';
    allEmployeeData.forEach((data, index)=>{
        // console.log(data, index);

        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g, "'");
        
        employee_list.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td> <img src = "${data.profile}" width="30" alt="profile_pic"/></td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.dob}</td>
                <td>${data.mobile}</td>
                <td>${data.password}</td>
                <td class = "table_buttons">
                    <button data = "${finalData}" index = "${index}" class="edit_btn">Edit</button>
                    <button index = "${index}" class="delete_btn">Delete</button>
                </td>
            </tr>
        `
    });

    action();//delete and update
}

const action = ()=>{

    //delete data
    let alldelbtn = employee_list.querySelectorAll('.delete_btn');
    for (const btn of alldelbtn) {
        btn.onclick = ()=>{
            let index = btn.getAttribute("index");
            allEmployeeData.splice(index, 1);
            localStorage.setItem("allEmployeeData", JSON.stringify(allEmployeeData));
            getEmployeeData();
        }
        
    }

    //edit data
    let addEditBtn = employee_list.querySelectorAll('.edit_btn');
    for (const btn of addEditBtn) {
        btn.onclick = ()=>{
            let index = btn.getAttribute("index");
            employee_card.style.display = "none";
            add_employee_modal.style.display = "flex";
            
            modal_heading.innerHTML = "Update Employee Information";
            allInput[6].value = "Update";

            let dataStr = btn.getAttribute("data");
            
            let finalData = dataStr.replace(/'/g, '"');

            let data = JSON.parse(finalData)
            console.log(data);

            //updating in input box

            allInput[1].value = data.name;
            allInput[2].value = data.email;
            allInput[4].value = data.mobile;
            allInput[3].value = data.dob;
            allInput[5].value = data.password;

            allInput[6].onclick = () =>{
                allEmployeeData[index] = {

                    name: allInput[1].value,
                    email: allInput[2].value,
                    mobile: allInput[4].value,
                    dob: allInput[3].value,
                    password: allInput[5].value,
                    profile : url === "" ? "./images/user.png" : url

                };
                localStorage.setItem('allEmployeeData', JSON.stringify(allEmployeeData));
                alert("data Updated");
                employee_form.reset('');

                employee_card.style.display = "flex";
                add_employee_modal.style.display = "none"; 

                getEmployeeData();

            }    
            
        }
    }
    
}

//runs the getemployee data
getEmployeeData();


//handle navbar buttons
nav_buttons.addEventListener('click', (e)=>{

    if(e.target.value === "Add New Employee"){
        employee_card.style.display = "none";
        add_employee_modal.style.display = "flex";    
    }

    if(e.target.value === "Delete All"){
        allEmployeeData = [];
        localStorage.removeItem("allEmployeeData");
        getEmployeeData();
    }

})

//search data 

searchbar.oninput = ()=>{
    search();
}

const search = ()=>{
    let value = searchbar.value.toLowerCase();
    let tr = employee_list.querySelectorAll("TR");
    for(let i=0; i<tr.length; i++){
        let allTd = tr[i].querySelectorAll("TD");

        let name = allTd[2].innerHTML;
        let email = allTd[3].innerHTML;
        let mobile = allTd[5].innerHTML;
        if(name.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }
        else if(email.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }
        else if(mobile.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none"
        }
    }

}


//add data
employee_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    allEmployeeData.push({
        name: allInput[1].value,
        email: allInput[2].value,
        mobile: allInput[4].value,
        dob: allInput[3].value,
        password: allInput[5].value,
        profile : url === "" ? "./images/user.png" : url
    });
    localStorage.setItem('allEmployeeData', JSON.stringify(allEmployeeData));
    alert("data inserted");
    employee_form.reset('');

    employee_card.style.display = "flex";
    add_employee_modal.style.display = "none"; 

    getEmployeeData();
})


//reading profile pic

allInput[0].onchange = (e)=>{
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[0].files[0]);
    fReader.onload = ()=>{
        url = fReader.result;
        // console.log(url);
        
    }
}


