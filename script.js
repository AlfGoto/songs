let musics = [
    "Je l'aime à mourir",
    "Les murs de poussière",
    "Je suis malade",
    "Comme d'habitude",
]

let currentSong = ''
let left = document.querySelector('nav .left')
let checkbox = document.getElementById('navrightcheckbox')
let main = document.getElementsByTagName('main')[0]

musics.forEach(e => {
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
                document.getElementById('navrightcheckbox').click()

                main.innerHTML += `<audio src="${"mp3/" + e + ".mp3"}" controls autoplay></audio>`
            })
            .catch(l => { console.log(l) })
    }
})










// fetch("lyrics/Je l'aime à mourir")
// .then(e=>e.text())
// .then(e=>{console.log(e)})
// .catch(e=>{console.log(e)})