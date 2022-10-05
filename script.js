const filmes = document.querySelector('.movies')
const busca =document.querySelector('.input')
const corpo =document.querySelector('.highlight__genre-launch')
const modal= document.querySelector('.modal')
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/';
let contador=0 
let listaFilmes=[]
const botaonext =document.querySelector('.btn-next')
const botaoprev=document.querySelector('.btn-prev')



//--------------------------------
//existem algumas funconalidades que  não fui capaz de aplicar sozinho por falta de tempo e/ou expertise. mas desejo voltar  nesse desafio anbtes do fim do curso para aplica-las
//--------------------------------


function carrosel() {
  fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (respostaFilme) {
    const promessaFilme = respostaFilme.json();
    filmes.innerHTML=''
    promessaFilme.then(function (body) {
      listaFilmes=body.results
        body.results.slice(contador,contador+5).forEach(function (filme, index) {
            
           
          const movieInfo= document.createElement('div')
          const tituloFilme= document.createElement('span')
          const movieRating= document.createElement('span')
          const estrela=document.createElement('img')
          const divmovie=document.createElement('div')
          

          tituloFilme.textContent=filme.title
          movieRating.textContent=filme.movie_rating
          divmovie.style.backgroundImage=`url(${POSTERS_URL}${filme.poster_path})`
          divmovie.style.backgroundSize="cover"

          tituloFilme.classList.add('movie__title')
          movieRating.classList.add('movie__rating')
          divmovie.classList.add('movie')
          movieInfo.classList.add('movie__info')
          estrela.src="./assets/estrela.svg"


          movieRating.append(estrela)
          movieInfo.append(tituloFilme,movieRating)
          filmes.append(divmovie)
          divmovie.append(movieInfo)

divmovie.addEventListener('click',()=>{
  console.log(filme)
})
        })

    })
})
}

carrosel()
botaonext.addEventListener('click',()=>{
  contador+=5
  if(contador>=listaFilmes.length){
  contador=0
  }
  carrosel()
  
  
})

botaoprev.addEventListener('click',function (event){
  contador-=5
  if(contador<0){
  contador=listaFilmes.length-5
  }
  carrosel()
})

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function(respostaHighlight){
    const promessaHighlight=respostaHighlight.json()

    promessaHighlight.then(function(body){
    const generos = body.genres
    
    const highlightVideo= document.querySelector('.highlight__video')
    highlightVideo.style.backgroundImage = `url(${body.backdrop_path})`
    highlightVideo.style.backgroundSize ="cover"
     const tituloHighlight=document.querySelector('.highlight__title')
     tituloHighlight.textContent=body.title
     const voteHighlight= document.querySelector('.highlight__rating')
     voteHighlight.textContent=body.vote_average
     const generoHighlight=document.querySelector('.highlight__genres')
     for(genero of generos){
       let contador=0
      const span= document.createElement('span')
      span.classList.add('.highlight__genres')
      corpo.append(span)
      generoHighlight.textContent=generos[contador].name
      contador++
     }
     const lancamentoHighlight=document.querySelector('.highlight__launch')
     lancamentoHighlight.textContent=body.release_date
     const descrihighlight=document.querySelector('.highlight__description')
     descrihighlight.textContent=body.overview
     
    })
})
fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function(respostaVid){
   const promessaVid=respostaVid.json()
   promessaVid.then(function(bodyVid){
    const vid=bodyVid.results
    const video=document.querySelector('.highlight__video-link')
    video.href="https://www.youtube.com/watch?v="+vid[0].key
   })
})

function abrirModal(){
  modal.classList.remove("hidden")

}
filmes.forEach(function (filme) {
  filme.addEventListener('click', function (event) {
      abrirModal(event.target)    
})
})







//busca.addEventListener('change',function(){
  //const promessaBusca = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query='+busca.value)
  //promessaBusca.then(function(respostaBusca){
    //  const bodyResposta=respostaBusca.json()
  //bodyResposta.then(function(bodyBusca){

  //})    
  //})
//})
