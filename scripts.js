var peticionHttp;
var idUsuario;
let urlApi = "http://www.omdbapi.com/?";
var apikey = "apikey=6b8b3aa3";

var AllMovies = [];

function cargaDatos() {
    let List = localStorage.getItem("lista");
    if (List !== null) {
        AllMovies = JSON.parse(List);
    }

    AllMovies.forEach((item) => {
        var Tarjeta = document.getElementById("movieCards");
        Tarjeta.append(fillACard(item));
    });
}

function inicializar_XHR() {
    if (window.XMLHttpRequest) {
        peticionHttp = new XMLHttpRequest();
    } else {
        peticionHttp = new ActiveXObject("Microsoft.XMLHttpRequest");
    }
}

function realizarPeticion(url, metodo, functionA) {
    peticionHttp.onreadystatechange = functionA;
    peticionHttp.open(metodo, url, true);
    peticionHttp.send(null);
}

//http://www.omdbapi.com/?apikey=6b8b3aa3&t=Avatar

function buscarPelicula() {
    if (peticionHttp.readyState == 4 && peticionHttp.status == 200) {
        var Tarjeta = document.getElementById("movieCards");
        var pelicula = JSON.parse(peticionHttp.responseText);

        // Tarjeta.append(createACard(pelicula));
        Tarjeta.append(fillACard(pelicula));
        AllMovies.push(pelicula);
        saveToSession(AllMovies);
        console.log(AllMovies);
    } else {
        console.log("No Se encontro la");
    }
}

function fillACard(pelicula) {
    const template = document.getElementById("template-card").content;
    const fragment = document.createDocumentFragment();

    template.querySelector("img").setAttribute("src", pelicula.Poster);
    template.querySelector("img").setAttribute("alt", pelicula.Title);
    template.querySelector("figcaption").textContent = pelicula.Title;
    template.querySelector("h5").textContent = pelicula.Title;
    template.querySelector("p").textContent = pelicula.Plot;
    template.querySelector("figure").setAttribute("id",pelicula.Title);
    template.querySelector("button").addEventListener("click", function(){ console.log("Objeto") });

    // console.log(template);

    let clone = document.importNode(template, true); // Clono todo el nodo template, y con el TRUE es para copiar el nodo completo
    fragment.appendChild(clone);

    return fragment;
}

function createACard(pelicula) {
    let grid = document.createElement("div");
    let card = document.createElement("div");
    let imgCard = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h4");
    let cardPlot = document.createElement("p");
    grid.classList.add("col-3");
    grid.classList.add("mb-2");
    card.classList.add("card");
    imgCard.classList.add("card-img-top");
    imgCard.src = pelicula.Poster;
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = pelicula.Title;
    cardPlot.classList.add("card-text");
    cardPlot.innerText = pelicula.Plot;
    console.log(pelicula);

    grid.append(card);
    card.append(imgCard);
    card.appendChild(cardTitle);
    card.appendChild(cardPlot);
    return grid;
}

function listaDePeliculas() {
    let titulo = document.getElementById("fromTitulo").value;
    inicializar_XHR();
    console.log(urlApi + apikey + "&" + "t=" + titulo);
    realizarPeticion(`${urlApi}${apikey}&t=${titulo}`, "GET", buscarPelicula);
}

function saveToSession(lista) {
    localStorage.setItem("lista", JSON.stringify(lista));
}

function borrarPelicula(event){
    console.log(event.target.parentNode.firstElementChild.innerText);
    AllMovies = AllMovies.filter(e => e.Title != event.target.parentNode.firstElementChild.innerText);
    saveToSession(AllMovies);
    console.log(AllMovies);

}
