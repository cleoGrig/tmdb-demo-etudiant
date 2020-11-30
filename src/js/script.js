document.addEventListener("DOMContentLoaded",function(){

    let connexion = new MovieDB();
    connexion.requeteDernierFilm();

});

    class MovieDB{

        constructor(){
            this.APIkey = "421d01be541d90743fa741bdb04e580e";
            this.lang = "fr-CA";
            this.baseURL = "https://api.themoviedb.org/3";
            this.imgPath = "http://image.tmdb.org/t/p/";
            this.totalFilm = 8;
        }

        requeteDernierFilm(){
            let requete = new XMLHttpRequest();

            requete.addEventListener("loadend",this.retourRequetteDernierFilm.bind(this));

            requete.open("GET",this.baseURL+"/movie/now_playing?api_key="+this.APIkey+"&language="+this.lang+"&page=1");
            requete.send();
        }

        retourRequetteDernierFilm(e){
            //console.log("retour dernier film");

            let target = e.currentTarget;
            let data;

            //console.log(target.responseText);

            data = JSON.parse(target.responseText).results;
            //console.log(data);

            this.afficheDernierFilm(data);
        }

        afficheDernierFilm(data){
            //console.log("affiche dernier film");

            for (let i = 0; i < this.totalFilm; i++) {
                //console.log(data[i].title);

                let unArticle = document.querySelector(".template>article.film").cloneNode(true);

                unArticle.querySelector("h2").innerHTML = data[i].title;

                unArticle.querySelector("p").innerHTML = data[i].overview || "Pas de description disponible";

                let src = this.imgPath + "w185" + data[i].poster_path;
                unArticle.querySelector("img").src = src;
                unArticle.querySelector("img").alt = "poster de " + data[i].title;


                document.querySelector(".liste-films").appendChild(unArticle);
            }
        }
    }
