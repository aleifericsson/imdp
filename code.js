let media_list = [];

function Media(name, year, type, rating){
        this.name = name;
        this.year = year;
        this.type = type;
        this.rating = rating;
}

function addMedia(media){
    media_list.push(media);
}

function createMedia(){
    //add the no refresh thing
    const temp_media = new Media(
        name_in.value,
        year_in.value,
        type_in.value,
        rating_in.value
    );
    addMedia(temp_media);
}

function toggleForm(){
    form.classList.toggle("offscreen");
}

const form = document.querySelector("#new-media");
const name_in = document.querySelector("#name");
const year_in = document.querySelector("#year");
const type_in = document.querySelector('input[name="media"]:checked');   
const rating_in = document.querySelector("#rating");
const submit = document.querySelector('#submit');
submit.addEventListener("click", createMedia);

const new_media_btn = document.querySelector("#new-media-btn");
new_media_btn.addEventListener("click", toggleForm);