import { catsData } from '/data.js'

// Get DOM elements
const emotionRadios = document.getElementById('emotion-radios')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const getImageBtn = document.getElementById('get-image-btn')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const memeModalInner = document.getElementById('meme-modal-inner')

// Add event listener to handle emotion radio click
const handleEmotionClick = (event) => {
    const HIGHLIGHT_CLASS = 'highlight'
    if (event.target.classList.contains('emotion-radios')) {
        const radioDivs = document.getElementsByClassName('radio')
        for (const radioDiv of radioDivs) {
            radioDiv.classList.remove(HIGHLIGHT_CLASS)
        }
        event.target.parentElement.classList.add(HIGHLIGHT_CLASS)
    }
}
document.addEventListener('click', handleEmotionClick)

// Handle 'GIFs only' checkbox and 'Get Image' button
getImageBtn.addEventListener('click', () => {
    const checkedRadio = document.querySelector('input[type="radio"]:checked')
    if (checkedRadio) {
        const catsArray = gifsOnlyOption.checked ?
            catsData.filter((cat) => cat.emotionTags.includes(checkedRadio.value) && cat.isGif) :
            catsData.filter((cat) => cat.emotionTags.includes(checkedRadio.value))
        displayCatImage(catsArray)
    }
})

// Display cat image in meme modal
const displayCatImage = (cats) => {
    const imgFileName = cats.length === 1 ?
        cats[0].image :
        cats[Math.floor(Math.random() * cats.length)].image

    memeModalInner.innerHTML = `
        <img src="images/${imgFileName}" class="cat-img">
    `
    memeModal.style.display = 'flex'
}

// Close meme modal
const hideMemeModal = () => {
    memeModal.style.display = 'none'
}
memeModalCloseBtn.addEventListener('click', hideMemeModal)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideMemeModal()
    }
})
document.addEventListener('click', (e) => {
    const isTargetModal = e.target === memeModal || memeModal.contains(e.target)
    const isTargetGetImageBtn = e.target === getImageBtn
    if (!isTargetModal && !isTargetGetImageBtn) {
        hideMemeModal()
    }
})

// Render emotion radio buttons
const renderEmotionRadios = (cats) => {
    let radioHTML = ''
    const emotionsArray = getEmotionsArray(cats)
    for (const emotion of emotionsArray) {
        radioHTML += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" class="emotion-radios" name="emotion-picker">
            </div>
        `
    }
    emotionRadios.innerHTML = radioHTML
}

const getEmotionsArray = (cats) => {
    const emotionsArray = []
    for (let cat of catsData) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

renderEmotionRadios(catsData)
