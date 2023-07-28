/*
    To Do:

    - add a dynamic rating star thing so that when you slide the bar it changes the star
    - add a delete button for cards
    - use firebase or whatever to save what is created

*/

let card_list = [];
let rommills;

function Media(name, year, creator, type, rating){
        this.name = name;
        this.year = year;
        this.creator = creator;
        this.type = type;
        this.rating = rating;
}

function addMedia(media){
    let stars = parseInt(media.rating);
    const star_string = generateStars(stars);
    const new_li = document.createElement("li");
    new_li.innerHTML = `
        <div>
            <div class = "card-name">${media.name}</div>
            <div class = "card-creator">${media.creator}</div>
            <div class = "card-year">${media.year}</div>
            <div class = "card-type">${media.type}</div>
            <div class = "card-rating">${star_string}</div>
        </div>
        <div>
            <button class="remove">Remove</button>
        </div>
    `;
    new_li.classList.add("media-card");
    new_li.classList.add("off");
    media_disp.appendChild(new_li);
    card_list.push(new_li);
    const remove = new_li.querySelector(".remove");
    remove.addEventListener("click",removeCard);
    rommills = 0
    holup(new_li, 0);
}

function holup(new_li, mills){
    if (mills>rommills+3){
        new_li.classList.remove("off");
}
    else{ setTimeout(holup(new_li,mills+1),100);}
}

function removeCard(e){
    const card = this.parentNode.parentNode;
    card.remove();
}

function generateStars(stars){
    let star_string = "";
    for (let i=0;i<5;i++){
        if (stars===0){
            star_string = star_string+"☆";
        }
        else if (stars===1){
            star_string = star_string+"&#x2BEA;";
            stars = stars-1;
        }
        else{
            star_string = star_string+"★";
            stars = stars-2;
        }
    }
    return star_string;
}

function createMedia(e){
    e.preventDefault();
    if (year_in.validity.valueMissing){

    }
    else{
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
        sonic.innerHTML="Disable Sonic Mode";
        header.setAttribute('style','background:#6663FF;');
        const thesonic = document.createElement("img");
        thesonic.setAttribute("src","./images/Portrait_sonic_winking.png");
        thesonic.style="height:auto; width:290px; margin-left: 5px;";
        const sHADOW = document.createElement("img");
        sHADOW.setAttribute("src","./images/shadow.png");
        sHADOW.style="height:auto; width:290px; position:relative; top:500px;";
        sidebar.appendChild(sHADOW);
        sidebar.appendChild(thesonic);
    }
}

function updateRating(e){
    rat_lab.innerHTML = "Rating: " + generateStars(parseInt(rating_in.value));
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
rating_in.addEventListener("input", updateRating)

const new_media_btn = document.querySelector("#new-media-btn");
new_media_btn.addEventListener("click", toggleForm);
const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", toggleForm);
const media_disp = document.querySelector(".media-disp");
const sonic = document.querySelector("#SONIC");
sonic.addEventListener("click", toggleSonic);
const header = document.querySelector(".header");
const sidebar = document.querySelector(".sidebar");
const rat_lab = document.querySelector("#rating-label");