const movieSearch = document.getElementById("search-input")
const sectionA = document.getElementById("section-a")
const sectionB = document.getElementById("section-b")

let movieArray = []
let movieSearchArray = []
let localArrayStorage = []

let isSearch = true

sectionA.innerHTML = JSON.parse(localStorage.getItem("sectionA"))
titleTest = JSON.parse(localStorage.getItem("wishlist"))


document.addEventListener("click",function(e){
   if(e.target.id === "search-btn")
   {
        if(isSearch === true)
        {
            apiFetch()
        }

        if(isSearch === false)
        {
            resetArray()
        }

   }

   if(e.target.dataset.add)
    {
       fetch(`http://www.omdbapi.com/?apikey=d9137905&t=${e.target.dataset.add}`)
        .then(response => {
            if(!response.ok)
            {
                throw Error("Something went wrong")
            }
            return response.json()
        })
        .then(data => {
            displaySecondPage(data)
        })   
        .catch(err => console.log(err))  
    }
})

function apiFetch(){
    fetch(`http://www.omdbapi.com/?apikey=d9137905&s=${movieSearch.value}`)
    .then(response => {
        if(!response.ok)
        {
            throw Error("Something Went Wrong")
        }
        return  response.json()
    })
    .then(data=>{
        checkMovieTitle(data)
        })
        .catch(err => console.error(err))

movieArray.forEach(function(movie){

    fetch(`http://www.omdbapi.com/?apikey=d9137905&t=${movie}`)
            .then(response => {
                if(!response.ok)
                {
                    throw Error("Something went wrong")
                }
                return response.json()
            })
            .then(data=>{ 
                displayFirstPage(data)                         
            })   
            .catch(err => console.log(err))
})
}

function checkMovieTitle(data){
    data.Search.forEach(function(movie){
        if(!movieArray.includes(movie.Title))
        {
            movieArray.push(movie.Title)
        }
    })
}

function displayFirstPage(data){

    movieSearchArray.push(data) 
    const displaySectionA = displayHtmlFirstPage(movieSearchArray)
    clearSearch()
    localStorage.setItem("sectionA",JSON.stringify(displaySectionA))
    sectionA.innerHTML = displaySectionA
}

function displaySecondPage(data){
    
            
    localArrayStorage.push(data)
    const displaySectionB = displaySecondPageHtml(localArrayStorage)
    localStorage.setItem("wishlist",JSON.stringify(displaySectionB))
}

function clearSearch(){
    isSearch = false
    movieSearch.value = ""
}

function resetArray(){
    while(0 < movieSearchArray.length)
            {
                movieSearchArray.pop()
            }
            
            while(0 < movieArray.length)
            {
                movieArray.pop()
            }
            isSearch = true
}

function displayHtmlFirstPage(displayArray){
 return displayArray.map(function(movie){
        return `<div class="section-content container">
        <img class="movie-icon" src="${movie.Poster}" />
        <d  iv class="movie-body">
            <div class="movie-titled">
                <h3>${movie.Title}</h3>
                <img class="star" src="public/images/icon.svg"/>
                <p>${movie.imdbRating}</p>
            </div>
            <div class="movie-type">
                <p>${movie.Runtime}</p>
                <P>${movie.Genre}</P>
                <button class="wishlist-btn" data-add="${movie.Title}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
                    </svg>
                    Watchlist
                </button>
            </div>
            <p class="movie-discription">${movie.Plot}</p>
        </div>
    </div> `}).join("")
}

function displaySecondPageHtml(displayArray){
    return displayArray.map(function(movie){
           return `<div id=${movie.Title} class="section-content container">
           <img class="movie-icon" src="${movie.Poster}" />
           <d  iv class="movie-body">
               <div class="movie-titled">
                   <h3>${movie.Title}</h3>
                   <img class="star" src="public/images/icon.svg"/>
                   <p>${movie.imdbRating}</p>
               </div>
               <div class="movie-type">
                   <p>${movie.Runtime}</p>
                   <P>${movie.Genre}</P>
                   <button class="wishlist-btn" data-remove="${movie.Title}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="white"/>
                        </svg>
                      Remove
                   </button>
               </div>
               <p class="movie-discription">${movie.Plot}</p>
           </div>
       </div> `}).join("")
   }
