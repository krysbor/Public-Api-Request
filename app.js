console.log('js connected')

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