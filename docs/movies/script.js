const API_KEY = "88d0dfbd0fffdfc263d1a5a19a9b6810"
let page = 1;
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = "https://media.themoviedb.org/t/p/w220_and_h330_face/"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function updatePage() {
    getMovies(API_URL())
    currentPage.innerHTML = page
}

function showMovies(movies) {
    moviesElement.innerHTML = ``
    movies.forEach(movie => {
        const { title, poster_path, overview, release_date } = movie
        const cardEl = document.createElement("div")
        cardEl.classList.add("movieCard")
        cardEl.innerHTML = `
        <h3>${title.substring(0, 50)}</h3>
        <br>
        <img src="${ API_IMAGE_URL + poster_path }" />
        <p class="date">Release Date: ${release_date}</p>
        <br>
        <div class="detail" >
            <button class="btn-overview" onclick="showOverview('${title.replace(/'/g, "\\'")}', '${overview.replace(/'/g, "\\'")}')">Overview</button>
        </div>
        `
        
        moviesElement.appendChild(cardEl)
    });
}

function showOverview(title, overview) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.innerHTML = `
        <h3>${title}</h3>
        <p>${overview}</p>
    `;
    modal.style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value

    if(searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

function nextPage() {
    if (page >= 1) {
        page += 1
        updatePage()
    }
}

function prevPage() {
    if (page > 1) {
        page -= 1
        updatePage()
    }
}

next.addEventListener("click", nextPage)
prev.addEventListener("click", prevPage)

updatePage()
