const notes_btn = document.getElementById('notes_btn');
const notes_list = document.querySelector('.notes_list');

notes_btn.addEventListener('click', ()=>{
    const notes_div = document.createElement('div');
    notes_div.classList.add('note_div');
    const div = document.createElement('div')
    div.classList.add('utility_div')

    const delete_img = document.createElement('img')
    delete_img.src = "./images/del.png"

    const copy_img = document.createElement('img');
    copy_img.src = "./images/copy.png"

    const notes_area = document.createElement('textarea');
    notes_area.classList.add('notes_area');
    notes_area.placeholder = "Add notes here..."
    notes_div.appendChild(notes_area)
    div.appendChild(copy_img)
    div.appendChild(delete_img)
    notes_div.appendChild(div)
    notes_list.appendChild(notes_div)
    

    delete_img.addEventListener('click', (e)=>{
        e.target.parentNode.parentNode.remove();
    })

    copy_img.addEventListener('click', (e)=>{
        notes_area.select();
        navigator.clipboard.writeText(notes_area.value);
    })
})