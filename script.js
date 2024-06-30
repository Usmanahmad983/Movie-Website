let left_btn = document.getElementById('backward');
let right_btn = document.getElementById('forward');
let cards = document.getElementsByClassName('cards')[0];
let searchResult = document.getElementsByClassName('search_result')[0];
let searchInput = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
});

right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
});

let json_url = "movie.json";

fetch(json_url).then(response => response.json())
    .then((data) => {
        data.forEach((ele, i) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = ` 
            <img src="${sposter} " alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="content">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMBD</span><ion-icon class="icon" name="star"></ion-icon>${imdb}</h3>
                            </div>
                        </div>
                    </div>
                `
            cards.appendChild(card);
        });

        document.getElementById('title').innerText = data[0].name;
        document.getElementById('gen').innerText = data[0].genre;
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('rate').innerHTML = `<span>IMBD</span><ion-icon class="icon" name="star"></ion-icon> ${data[0].imdb}`;

        data.forEach(element => {
            let { name, imdb, date, sposter, genre, url } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = ` 
               <img src="${sposter}" alt="">
                        <div class="content">
                            <h3>${name}</h3>
                            <p>${genre}, ${date}, <span>IMBD</span><ion-icon class="icon" name="star"></ion-icon>${imdb}</p>
                        </div>
                `
            searchResult.appendChild(card);
        });

        searchInput.addEventListener('keyup', () => {
            let filter = searchInput.value.toUpperCase();
            let a = searchResult.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('content')[0];
                let textValue = b.textContent || b.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    a[index].style.display = "flex";
                    searchResult.style.visibility = "visible";
                    searchResult.style.opacity = 1;
                }
                else {
                    a[index].style.display = "none";
                }
                if (searchInput.value == 0) {
                    searchResult.style.visibility = "hidden";
                    searchResult.style.opacity = 0;
                }
            }
        });


        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play');
        play.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                play.innerHTML = `PAUSE <ion-icon class="playIcon icon" name="play"></ion-icon>`
            } else {
                play.innerHTML = `PLAY <ion-icon class="playIcon icon" name="pause-circle"></ion-icon>`
                video.pause();
            }
        });



        let series = document.getElementById('series');
        let movies = document.getElementById('movies');


        series.addEventListener('click', () => {
            cards.innerHTML = '';

            let series_array = data.filter(ele => {
                return ele.type === "series";
            });

            series_array.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre, url } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = ` 
                <img src="${sposter} " alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="">
                            <div class="content">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                    <h3><span>IMBD</span><ion-icon class="icon" name="star"></ion-icon>${imdb}</h3>
                                </div>
                            </div>
                        </div>
                    `
                cards.appendChild(card);
            });
        })



        
        movies.addEventListener('click', () => {
            cards.innerHTML = '';

            let movies_array = data.filter(ele => {
                return ele.type === "movies";
            });

            movies_array.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre, url } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = ` 
                <img src="${sposter} " alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="">
                            <div class="content">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                    <h3><span>IMBD</span><ion-icon class="icon" name="star"></ion-icon>${imdb}</h3>
                                </div>
                            </div>
                        </div>
                    `
                cards.appendChild(card);
            });
        })




    });
