window.addEventListener('load', fetchMemes())
let allMemes = []
let box = document.getElementById('column')

async function fetchMemes () 
{
    const response = await fetch('https://api.imgflip.com/get_memes')
    const json = await response.json()

    allMemes = json.data.memes.map(meme => {
        const {name, url} = meme

        return {
            name,
            image: url
        }
    })
    console.log(allMemes)
    addElement()
}

function addElement(){
    let memes = "<div id='memes'>"

    allMemes.forEach(meme => {
        const{name, image} = meme

        const memeHTML =`
        <div id='meme'>
        <h2>${name}</h2>
        <img src="${image}">
        <p>legenda...</p>
        </div>
        `
        memes += memeHTML
    })
    memes += '</div>'
    box.innerHTML = memes
}