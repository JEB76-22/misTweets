// Variables
const formulario = document.querySelector("#formulario");

const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

// Event Listener
eventListener();
function eventListener(){
    //cuando el usuario apreta agrear nuevo tweet
    formulario.addEventListener("submit", (agregarTweet));

    //cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // console.log(tweets);

        crearHtml();
    });
}


// Funciones
function agregarTweet(e){
    e.preventDefault();

    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // validacion...
    if(tweet === ''){
        mostrarError("Un mensaje no pude ir vacio");
        return;//evita que siga la ejecucion, siempre que el if este dentro de una funcion
    }
    const tweetObj = {
        id: Date.now(),
        texto: tweet,
        // tweet
    };

    // Agregar al array de tweets
    tweets = [...tweets, tweetObj];
    // console.log(tweets);


    //Una vez agregado vamos acrear al HTML
    crearHtml();

    // reiniciar el formulario
    formulario.reset();

}


//Mostrar mensaje de error
function mostrarError(mensaje){
    const mostrarError = document.createElement("p");
    mostrarError.textContent = mensaje;
    mostrarError.classList.add("error");

    // Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mostrarError);

    // despues de 3 segundo elimina mensaje
    setTimeout(() => {
        mostrarError.remove();
    }, 3000);
}

//Muestra un listado de los tweet
function crearHtml(){
    limpiarHtml();

    if(tweets.length > 0){//si el array no esta vacío(ERROR length No lenght)
        tweets.forEach(tw => {
            // Agregar un boton para eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "X";

            // Eliminar del Dom
            btnEliminar.onclick = ()=>{
                eliminarTweet(tw.id);
            };
            // btnEliminar.addEventListener("click",()=>{
            //     eliminarTweet();
            // });


            // Crear el HTML
            const li = document.createElement("li");
            li.classList.add('estilo-li')

            // Añadir el texto
            li.innerText = tw.texto;

            //ASignar el boton
            li.appendChild(btnEliminar);

            // insertarlo en el HTML
            const listaTweets = document.querySelector("#lista-tweets");
            listaTweets.appendChild(li);
        });
   }
   sincronizarStorage();
}

// Agrega los tweet a localStorage
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Elimina un Tweet
function eliminarTweet(id){
    tweets = tweets.filter(tw => tw.id !== id);
    // filter va a listar todos los distintos de id
    crearHtml();
}

// limpiar HTml
function limpiarHtml(){
    while(listaTweets.firstChild){//siempre remueve el primer hijo
        listaTweets.removeChild(listaTweets.firstChild);

    }
}

