let musics = [
    { name: "Je l'aime à mourir" },
    { name: "Les murs de poussière" },
    { name: "Je suis malade", checkPoint: [{ name: "Premier Refrain", time: 53 }, { name: "Second Couplet", time: 97 }] },
    { name: "Hier encore" },
    { name: "L'envie" },
    { name: "Comme d'habitude" },
]

let currentSong = ''
let left = document.querySelector('nav .left')
let checkbox = document.getElementById('navrightcheckbox')
let main = document.getElementsByTagName('main')[0]

musics.forEach(e => {
    if (!e.checkPoint) e.checkPoint = []
    e.checkPoint.unshift({ name: "Début", time: 0 })
    createInLeft(e)
    createInMainMenu(e)
})

function createInMainMenu(music) {
    let div = document.createElement('div')
    div.innerHTML = music.name
    div.classList.add('mainMusic')
    main.appendChild(div)

    div.onclick = () => { getMusic(music) }
}

function createInLeft(music) {
    let div = document.createElement('div')
    div.innerHTML = music.name
    left.appendChild(div)

    div.onclick = () => { getMusic(music) }
}

function getMusic(music) {
    if (currentSong === music) return
    currentSong = music
    main.innerHTML = ''

    fetch("lyrics/" + currentSong.name)
        .then(l => l.text())
        .then(l => { openMusic(l) })
        .catch(l => { console.log(l) })
}

function openMusic(lyrics) {
    let lyricsP = document.createElement('p')
    lyricsP.innerText = lyrics
    main.appendChild(lyricsP)
    if (checkbox.checked) checkbox.click()

    if (currentSong.checkPoint) createCheckpoints()

    main.innerHTML += `<audio id="audio" src="${"mp3/" + currentSong.name + ".mp3"}" controls autoplay></audio>`

    setAllButtonsClicks()

}


function createCheckpoints() {
    let checkPointsdiv = main.appendChild(document.createElement('div'))
    checkPointsdiv.id = "checkPointDiv"

    currentSong.checkPoint.forEach((check) => {
        let button = document.createElement('button')
        checkPointsdiv.appendChild(button)
        button.innerHTML = check.name
        button.setAttribute("time", check.time)
    })
}

function setAllButtonsClicks() {
    const allButtons = document.querySelectorAll("[time]")
    Array.from(allButtons).forEach(butt => {
        butt.onclick = function () { document.getElementById("audio").currentTime = butt.getAttribute("time") }
    })
}




document.addEventListener('keypress', e => {
    if (e.key === " ") {
        document.getElementsByTagName('audio')[0].remove()
        main.innerHTML += `<audio src="${"mp3/" + currentSong + ".mp3"}" controls autoplay></audio>`
    }
})