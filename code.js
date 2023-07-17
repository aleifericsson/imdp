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