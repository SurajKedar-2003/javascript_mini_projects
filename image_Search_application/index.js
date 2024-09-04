const search_box = document.getElementById('search_box');
const search_btn = document.getElementById('search_btn');
const showMore_btn = document.getElementById('showMore-btn');
const searchResult_list = document.querySelector('.main');

const accessKey = 'kYCgeIbj45dYbxKFBPrvO4o8MMqLRrjRGh_akFFoAgw';

let inputData = '';
let page = 1;


async function searchImage(){
    inputData = search_box.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    

    if(page === 1){
        searchResult_list.innerHTML = '';
    }

    results.map((result)=>{
        const imageDiv = document.createElement('div');
        imageDiv.classList.add("search_result-single");
        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_description
        const imglink = document.createElement('a');
        imglink.href = result.links.html;
        imglink.target = "_blank";
        imglink.textContent = result.alt_description;

        imageDiv.appendChild(image);
        imageDiv.appendChild(imglink);

        searchResult_list.appendChild(imageDiv);
    })

    page++;
    if(page > 1){
        showMore_btn.style.display = "flex";
    }
}

search_btn.addEventListener('click', (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();

})

showMore_btn.addEventListener('click', ()=>{
    searchImage();
})