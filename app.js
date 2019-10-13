console.log('js connected')
const URL = 'https://randomuser.me/api/?results=12'

const displaySearchMarkup = () => {
    const searchContainer = document.querySelector('.search-container')
    const formElement = document.createElement('form')
    searchContainer.appendChild(formElement)
    formElement.action = '#'
    formElement.method = 'get'
    formElement.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    `
}
displaySearchMarkup()


const generateUser = (object) => {
    const gallery = document.querySelector('#gallery')
    const div1 = document.createElement('div')
    div1.className = 'card'
    div1.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${object.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${object.name.first} ${object.name.last} last</h3>
            <p class="card-text">${object.email}</p>
            <p class="card-text cap">${object.location.city}, ${object.location.state}</p>
        </div>
    `
    gallery.appendChild(div1)

}



/* Downloads data */
const getData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {data.results.forEach(e => generateUser(e))})
}
getData(URL)