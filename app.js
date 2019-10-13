console.log('js connected')
const URL = 'https://randomuser.me/api/?results=12'
let savedData
let dataSaved = false

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

    /*Modal
    const modalDiv = document.createElement('div')
    modalDiv.className = 'modal-container'
    modalDiv.innerHTML += `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${object.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${object.name.first}</h3>
                <p class="modal-text">${object.email}</p>
                <p class="modal-text cap">${object.location.city}</p>
                <hr>
                <p class="modal-text">${object.phone}</p>
                <p class="modal-text">${object.location.street.number} ${object.location.street.name},
                ${object.location.state}, ${object.location.postcode}</p>
                <p class="modal-text">Birthday: ${object.dob.date.slice(0, 10)}</p>
            </div>
        </div>
    `
    div1.appendChild(modalDiv)
    */
}



/* Downloads data */
const getData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => saveData(data.results))
        .then(data2 => displayUsers(data2))
}

const saveData = (data) => {
    savedData = data
    dataSaved = true
    return savedData
}

const displayUsers = (object) => {
    object.forEach(e => generateUser(e))
}

getData(URL)



/*const closeModalButton = document.querySelector('.modal-close-btn')
closeModalButton.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal')
})
*/
