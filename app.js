const URL = 'https://randomuser.me/api/?nat=us&results=12'
/*Stores downloaded data in an array*/
let savedData = []
/*Checks if saving has been succesfully completed*/
let dataSaved = false
/*Checks if the modal is currently visible*/
let modalDisplay = false

/* Displays searchbar*/
const displaySearchMarkup = () => {
    const searchContainer = document.querySelector('.search-container')
    const formElement = document.createElement('form')
    searchContainer.appendChild(formElement)
    formElement.action = '#'
    formElement.method = 'get'
    formElement.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `
}
displaySearchMarkup()

/*generates html for the user card and modal*/
const generateUser = (object, id) => {
    const gallery = document.querySelector('#gallery')
    const div1 = document.createElement('div')
    div1.className = 'card'
    div1.id = savedData[id].login.username
    div1.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${object.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${object.name.first} ${object.name.last}</h3>
            <p class="card-text">${object.email}</p>
            <p class="card-text cap">${object.location.city}, ${object.location.state}</p>
        </div>
    `
    gallery.appendChild(div1)


    const modalDiv = document.createElement('div')
    modalDiv.className = 'modal-container' + ' ' + savedData[id].login.username
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn ${savedData[id].login.username + savedData[id].login.username}"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${object.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${object.name.first}</h3>
                <p class="modal-text">${object.email}</p>
                <p class="modal-text cap">${object.location.city}</p>
                <hr>
                <p class="modal-text">${object.cell}</p>
                <p class="modal-text">${object.location.street.number} ${object.location.street.name},
                ${object.location.state}, ${object.location.postcode}</p>
                <p class="modal-text">Birthday: ${object.dob.date.slice(0, 10)}</p>
            </div>
        </div>
    `
    modalDiv.style.display = 'none'
    document.body.appendChild(modalDiv)

}



/* gets data */
const getData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => saveData(data.results))
        .then(data2 => displayUsers(data2))
        .then(statement => addListeners(statement))
}

/*Saves the data to the global variable 'savedData'*/
const saveData = (data) => {
    data.map((element) => {
        savedData.push(element)
    })
    dataSaved = true
    return savedData
}

/* generates 12 users*/
const displayUsers = (array) => {
    for (let i = 0; i < 12; i += 1) {
        generateUser(array[i], i)    }
    /*array.forEach(element => generateUser(element))*/
    return true
}

const addListeners = (statement) => {
    if (statement === true) {
        const div = document.querySelectorAll('.card')
        div.forEach((elem) =>{
            elem.addEventListener('click', (e) => {
                const currentElement = e.currentTarget
                const currentElementId = currentElement.id
                const modal = document.querySelector(`.${currentElementId}`)
                if (modalDisplay === false) {
                    modal.style.display = 'block'
                    modalDisplay = true
                } else {
                    /*modal.style.display = 'none'
                    modalDisplay = false*/
                }
            })
        })
        const closeBtns = document.querySelectorAll('.modal-close-btn')
        closeBtns.forEach((e) => {
            e.addEventListener('click', (e) => {
                const modals = document.querySelectorAll('.modal-container')
                modals.forEach((e) => {
                    e.style.display = 'none'
                    modalDisplay = false
                })
                e.currentTarget.parentElement.parentElement.style.display = 'none'

            })
        })


    }
}

/* looking for users that matches input value*/
const searchUser = (input) => {
    const cards = document.querySelectorAll('.card')
    /*hides all users*/
    cards.forEach((e) =>{
        e.style.display = 'none'
    })

    const names = document.querySelectorAll('.card-name')
    names.forEach((e) => {
        if (e.innerHTML.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
            console.log('found')
            e.parentElement.parentElement.style.display = 'flex'
        }
    })
}

const searchListener = () => {
   const searchInput = document.querySelector('#search-input')
   const searchButton = document.querySelector('#search-submit')
   searchButton.addEventListener('click', (e) => {
        const inputValue = searchInput.value
        searchUser(inputValue)
    })

    searchInput.addEventListener('keyup', (e) => {
        const inputValue = searchInput.value
        searchUser(inputValue)
    })
}

getData(URL)
searchListener()
