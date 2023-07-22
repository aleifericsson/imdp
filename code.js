let media_list = [];

function Media(name, year, creator, type, rating){
        this.name = name;
        this.year = year;
        this.creator = creator;
        this.type = type;
        this.rating = rating;
}

function addMedia(media){
    media_list.push(media);
    let stars = parseInt(media.rating);
    let star_string = "";
    for (let i=0;i<5;i++){
        if (stars===0){
            star_string = star_string+"☆";
        }
        else if (stars===1){
            star_string = star_string+"⯪";
            stars = stars-1;
        }
        else{
            star_string = star_string+"★";
            stars = stars-2;
        }
    }
    const new_li = document.createElement("li");
    new_li.innerHTML = `
        <div class = "card-name">${media.name}</div>
        <div class = "card-creator">${media.creator}</div>
        <div class = "card-year">${media.year}</div>
        <div class = "card-type">${media.type}</div>
        <div class = "card-rating">${star_string}</div>
    `;
    new_li.classList.add("media-card");
    media_disp.appendChild(new_li);
}

function createMedia(e){
    e.preventDefault();
    const type_in = document.querySelector('input[name="media"]:checked');  
    const temp_media = new Media(
        name_in.value,
        year_in.value,
        creator_in.value,
        type_in.value,
        rating_in.value
    );
    addMedia(temp_media);
    toggleForm();
}

function toggleForm(){
    form.classList.toggle("offscreen");
}


function toggleSonic(){
    if (sonic.classList.contains("SONIC")){
        location.reload();
        return false;
    } else{
        temp_sonic.forEach(med => addMedia(new Media(
            med.name,
            med.year,
            med.creator,
            med.type,
            med.rating
        )));
        sonic.classList.add("SONIC");
    }
}

const endpoint = './sonic.json';
temp_sonic = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => temp_sonic.push(...data));

const form = document.querySelector("#new-media");
const name_in = document.querySelector("#name");
const year_in = document.querySelector("#year"); 
const creator_in = document.querySelector("#creator");
const rating_in = document.querySelector("#rating");
const submit = document.querySelector('#submit');
submit.addEventListener("click", createMedia);

const new_media_btn = document.querySelector("#new-media-btn");
new_media_btn.addEventListener("click", toggleForm);
const media_disp = document.querySelector(".media-disp");
const sonic = document.querySelector("#SONIC");
sonic.addEventListener("click", toggleSonic);