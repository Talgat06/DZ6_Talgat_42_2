// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')

let currentIndex = 0;
let interval;

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

const startSlide = () => {
    interval = setInterval(() => {
        hideTabContent()
        currentIndex++
        if (currentIndex >= tabContentBlocks.length) {
            currentIndex = 0
        }
        showTabContent(currentIndex)
    }, 3000)
}

const stopSlide = () => {
    clearInterval(interval)
}

hideTabContent()
showTabContent()

    tabParent.onclick = (event) => {
        if (event.target.classList.contains('tab_content_item')) {
            tabItems.forEach((item, index) => {
                if (event.target === item) {
                    hideTabContent()
                    showTabContent(index)
                    currentIndex = index
                    stopSlide()
                    startSlide()
                }
            })
        }
    }

    startSlide()

// CONVERTER

    const usdInput = document.querySelector('#usd')
    const somInput = document.querySelector('#som')
    const eurInput = document.querySelector('#eur')

    const converter = (element, targetElement) => {
        element.oninput = () => {
            const request = new XMLHttpRequest();
            request.open('GET', '../data/converter.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send()

            request.onload = () => {
                const data = JSON.parse(request.response)
                if (element.id === 'som') {
                    targetElement.usd.value = (element.value / data.usd).toFixed(2)
                    targetElement.eur.value = (element.value / data.eur).toFixed(2)
                }
                if (element.id === 'usd') {
                    targetElement.som.value = (element.value * data.usd).toFixed(2)
                    targetElement.eur.value = (element.value * (data.usd / data.eur)).toFixed(2)
                }
                if (element.id === 'eur') {
                    targetElement.som.value = (element.value * data.eur).toFixed(2)
                    targetElement.usd.value = (element.value * (data.eur / data.usd)).toFixed(2)
                }
                if (element.value === '') {
                    targetElement.value = ''
                    targetElement.value = ''
                    targetElement.value = ''
                }
            }
        }
    }

    converter(somInput, { usd: usdInput, eur: eurInput });
    converter(usdInput, { som: somInput, eur: eurInput });
    converter(eurInput, { som: somInput, usd: usdInput });

// DRY - don`t repeat yourself - не повторяй самого себя
// KISS - keep it super stupid - делай очень проще

// CARD SWITCHER

    const card = document.querySelector('.card')
    const prevButton = document.querySelector('#btn-prev')
    const nextButton = document.querySelector('#btn-next')

    let cardId = 1
    let MaxCardId = 200

    function load() {
        fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
            .then((response) => response.json())
            .then((data) => {
                const {id, title, completed} = data

                card.innerHTML = `
                    <p>${title}</p>
                    <p>${completed}</p>
                    <span>${id}</span>
                `
            })
        nextButton.onclick = () => {
            cardId++
            if (cardId > MaxCardId) {
                cardId = 1
            }
            load(cardId)
        }

        prevButton.onclick = () => {
            cardId--
            if (cardId < 1) {
                cardId = MaxCardId
            }
            load(cardId)
        }
    }
    load(cardId)

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => console.log(data))