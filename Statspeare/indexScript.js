var i = 0;

for (i = 0; i < 4; i++) {
    // create col object
    var newOpt = document.createElement("div");
    newOpt.classList.add("col")
    // create cardObject
    var card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("shadow-sm")

    // cover photo object
    var coverPhoto = document.createElement("svg")
    coverPhoto.classList.add("bd-placeholder-img")
    coverPhoto.classList.add("card-img-top")
    card.appendChild(coverPhoto)

    // card body object
    var body = document.createElement('div')
    body.classList.add("card-body")
    var title = document.createElement('h5')
    title.textContent = 'Cymbeline'
    var text = document.createElement('p')
    text.classList.add('card-text')
    text.textContent='Hang there like fruit my soul, till the tree die'
    body.appendChild(title)
    body.appendChild(text)
    card.appendChild(body)
    newOpt.appendChild(card)

  
    var a = document.getElementById("iconListGrid")

    a.appendChild(newOpt);
}