let name = document.getElementById('name');
let age = document.getElementById('age');
let country = document.getElementById('country');
let form = document.getElementById('form');
let table = document.getElementById('table');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let data = createList(name.value, age.value, country.value);
    table.appendChild(data);
})


function createList(name, age, country){
    let row = document.createElement('tr');

    let nameColumn = document.createElement('td');
    nameColumn.innerText = name;

    let ageColumn = document.createElement('td');
    ageColumn.innerText = age;

    let countryColumn = document.createElement('td');
    countryColumn.innerText = country;

    let actionColumn = document.createElement('td');

    let edit_btn = document.createElement('button');
    edit_btn.innerText = 'Edit';

    let delete_btn = document.createElement('button');
    delete_btn.innerText = 'Delete';

    edit_btn.addEventListener('click', (e)=>{
        let updatedName = prompt('edit name', name);
        let updatedAge = prompt('edit age', age);
        let updatedCountry = prompt('edit country', country);

        if(updatedName !== null && updatedAge !== null && updatedCountry !== null){
            nameColumn.innerText = updatedName;
            ageColumn.innerText = updatedAge;
            countryColumn.innerText = updatedCountry;
        }
    });

    delete_btn.addEventListener('click', ()=>{
        table.removeChild(row);
    })


    actionColumn.appendChild(edit_btn);
    actionColumn.appendChild(delete_btn);

    row.appendChild(nameColumn);
    row.appendChild(ageColumn);
    row.appendChild(countryColumn);
    row.appendChild(actionColumn);

    return row;
}
