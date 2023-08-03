// Display painting info in the DOM
export function displayPaintingInfo(info){
    const infoElement = document.getElementById('painting-info')
    // Set the html content inside info element
    infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Description: ${info.description}</p>
    <p>Year: ${info.year}</p>
    `
    infoElement.classList.add('show')
}

export function hidePaintingInfo(){
    const infoElement = document.getElementById('painting-info')
    
    infoElement.classList.remove('show') // Remove the 'show' class
}