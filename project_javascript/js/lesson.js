const phoneInput = document.querySelector('#phone_input')
const phoneCheck = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneCheck.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = ' NOT OK'
        phoneResult.style.color = 'red'
    }
}



// TAB SLIDER

const tabsContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

let currentTabIndex = 0

const hideTabContent = () => {
    tabsContent.forEach((tabContent) => {
        tabContent.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabsContent = (index) => {
    tabsContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

const switchTabs = () => {
    hideTabContent()
    currentTabIndex = (currentTabIndex + 1) % tabs.length
    showTabsContent(currentTabIndex)
}


switchTabs()
setInterval(switchTabs, 3000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tabElement, tabIndex) => {
            if (event.target === tabElement) {
                hideTabContent()
                showTabsContent(tabIndex)
                currentTabIndex = tabIndex
            }
        })
    }
}






// CONVERTER


// DRY - don`t repeat yourself
// KISS - keep it short and simple


const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
// const eur = document.querySelector('#eur');
//
// const converter = (fromElement, toElement1, toElement2, currencyFrom, currencyTo1, currencyTo2) => {
//     fromElement.oninput = () => {
//         const request = new XMLHttpRequest();
//         request.open("GET", "../data/converter.json");
//         request.setRequestHeader("Content-type", "application/json");
//         request.send();
//
//         request.onload = () => {
//             const response = JSON.parse(request.response);
//             const amount = parseFloat(fromElement.value);
//
//             if (!isNaN(amount)) {
//                 toElement1.value = (amount / response[currencyTo1]).toFixed(2);
//                 toElement2.value = (amount / response[currencyTo2]).toFixed(2);
//             } else {
//                 toElement1.value = '';
//                 toElement2.value = '';
//             }
//         };
//     };
// };
//
//
// converter(som, usd, eur, 'som', 'usd', 'eur');
// converter(usd, som, eur, 'usd', 'som', 'eur');
// converter(eur, som, usd, 'eur', 'som', 'usd');







const converter = (element, target, isTrue) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            switch (isTrue) {
                case 'som':
                    target.value = (element.value / response.usd).toFixed(2)
                    break
                case 'usd':
                    target.value = (element.value * response.usd).toFixed(2)
                    break
                default:
                    break
            }
            element.value === '' ? target.value = '' : null
        }
    }
}



converter(som, usd, 'som')
converter(usd, som, 'usd')


som.addEventListener('input', (event) => {
    // console.log(event.target.value)
    const request = new XMLHttpRequest()
    request.open("GET", "../data/convertor.json")
    request.setRequestHeader("Content-type", "application/json")
    request.send()

    request.addEventListener('load', () => {
        const response = JSON.parse(request.response)
        usd.value = (som.value  / response.usd).toFixed(2)
    })
})







// CARD SWITCHER

// const card = document.querySelector('.card'),
//      btnPrev = document.querySelector('#btn-prev'),
//      btnNext = document.querySelector('#btn-next')
//
// let count = 1
//
// const updateCard = () => {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//         .then(response => response.json())
//         .then(({ title, completed, id }) => {
//             card.innerHTML = `
//                 <p>${title}</p>
//                 <p style="color: ${completed ? 'green' : 'red'};">${completed}</p>
//                 <span>${id}</span>
//             `
//         })
// }





// const handleButtonClick = (increment) => {
//     count = (count + increment - 1 + 200) % 200 + 1
//     updateCard()
// }
//
// updateCard()
//
// btnNext.onclick = () => handleButtonClick(1)
// btnPrev.onclick = () => handleButtonClick(-1)






//
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "GET",
//     headers: {"Content-type": "application/json"}
// })
//     .then((response) => response.json())
//     .then((data) => console.log(data))













// CARD SWITCHER

const card = document.querySelector('.card'),
    btnPrev = document.querySelector('#btn-prev'),
    btnNext = document.querySelector('#btn-next')

let count = 1

const updateCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        if (!response.ok) {
            throw new Error('Failed to fetch card data')
        }

        const { title, completed, id } = await response.json()
        card.innerHTML = `
            <p>${title}</p>
            <p style="color: ${completed ? 'green' : 'red'};">${completed}</p>
            <span>${id}</span>
        `
    } catch (error) {
        console.error('An error occurred while updating the card:', error)
    }
}




const handleButtonClick = (increment) => {
    count = (count + increment - 1 + 200) % 200 + 1
    updateCard()
}

updateCard()

btnNext.onclick = () => handleButtonClick(1)
btnPrev.onclick = () => handleButtonClick(-1)





// Fetch posts using async/await and try/catch

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('An error occurred while fetching posts:', error)
    }
}

fetchPosts()