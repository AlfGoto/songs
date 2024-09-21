let musics = [
    "Je l'aime à mourir",
    "Les murs de poussière",
    "Je suis malade",
    "L'envie",
    "Comme d'habitude",
]

let currentSong = ''
let left = document.querySelector('nav .left')
let checkbox = document.getElementById('navrightcheckbox')
let main = document.getElementsByTagName('main')[0]

musics.forEach(e => {
    createInLeft(e)
    createInMainMenu(e)
})

function createInMainMenu(e) {
    let div = document.createElement('div')
    div.innerHTML = e
    div.classList.add('mainMusic')
    main.appendChild(div)

    div.onclick = () => {
        currentSong = e
        main.innerHTML = ''

        fetch("lyrics/" + e)
            .then(l => l.text())
            .then(l => {
                let lyricsP = document.createElement('p')
                lyricsP.innerText = l
                main.appendChild(lyricsP)
                if(checkbox.checked)checkbox.click()

                main.innerHTML += `<audio src="${"mp3/" + e + ".mp3"}" controls autoplay></audio>`
            })
            .catch(l => { console.log(l) })
    }
}

function createInLeft(e) {
    let div = document.createElement('div')
    div.innerHTML = e
    left.appendChild(div)

    div.onclick = () => {
        if (currentSong === e) return
        currentSong = e
        main.innerHTML = ''

        fetch("lyrics/" + e)
            .then(l => l.text())
            .then(l => {
                let lyricsP = document.createElement('p')
                lyricsP.innerText = l
                main.appendChild(lyricsP)
                checkbox.click()

                main.innerHTML += `<audio src="${"mp3/" + e + ".mp3"}" controls autoplay></audio>`
            })
            .catch(l => { console.log(l) })
    }
}












document.addEventListener('keypress', e => {
    if (e.key === " ") {
        document.getElementsByTagName('audio')[0].remove()
        main.innerHTML += `<audio src="${"mp3/" + currentSong + ".mp3"}" controls autoplay></audio>`
    }
})









// fetch("lyrics/Je l'aime à mourir")
// .then(e=>e.text())
// .then(e=>{console.log(e)})
// .catch(e=>{console.log(e)})