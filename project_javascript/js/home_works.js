// const gmailInput = document.querySelector('#gmail_input')
// const gmailCheck = document.querySelector('#gmail_button')
// const gmailResult = document.querySelector('#gmail_result')
//     const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
//
// gmailCheck.onclick = () => {
//     if (regExp.test(gmailInput.value)) {
//         gmailResult.innerHTML = 'Верный Gmail адрес'
//         gmailResult.style.color = 'green'
//     } else {
//         gmailResult.innerHTML = 'Не корректный адрес Gmail'
//         gmailResult.style.color = 'red'
//     }
// }





// const parentBlock = document.querySelector('.parent_block')
// const childBlock = document.querySelector('.child_block')
//
// function moveBlock(position) {
//     if (position <= parentBlock.offsetWidth - childBlock.offsetWidth) {
//         childBlock.style.left = position + 'px'
//         setTimeout(() => moveBlock(position + 1), 10)
//     } else {
//         console.log("Движение завершено")
//     }
// }
//
// moveBlock(0)



// const  box = document.querySelector('.child_block')

// let positionX = 0
// let positionY = 0
//
// const move = () => {
//     if (positionX < 448 && positionY === 0) {
//         positionX++
//         box.style.left = `${positionX}px`
//         setTimeout(move,1)
//     }else if (positionX >= 448 && positionY < 448) {
//         positionY++
//         box.style.top = `${positionY}px`
//         setTimeout(move, 1)
//     }
// }
//
// move()






// const box = document.querySelector('.child_block')
//
// let positionX = 0
// let positionY = 0
// let maxX = 448
// let maxY = 448
//
// const move = () => {
//     if (positionX < maxX && positionY === 0) {
//         positionX++
//         box.style.left = positionX + 'px'
//         setTimeout(move, 1)
//     } else if (positionX >= maxX && positionY < maxY) {
//         positionY++
//         box.style.top = positionY + 'px'
//         setTimeout(move, 1)
//     } else if (positionY >= maxY && positionX > 0) {
//         positionX--
//         box.style.left = positionX + 'px'
//         setTimeout(move, 1)
//     } else if (positionX <= 0 && positionY > 0) {
//         positionY--
//         box.style.top = positionY + 'px'
//         setTimeout(move, 1)
//     }
// }
//
// move()






let intervalId
let secondsCount = 0
let isRunning = false

const updateCounter = () => {
    document.getElementById('secondsS').textContent = secondsCount++
}

const startTimer = () => {
    if (!isRunning) {
        isRunning = true
        intervalId = setInterval(updateCounter, 1000)
    }
}

const stopTimer = () => {
    if (isRunning) {
        isRunning = false
        clearInterval(intervalId)
    }
}

const resetTimer = () => {
    stopTimer()
    secondsCount = 0
    document.getElementById('secondsS').textContent = '0'
}

document.getElementById('start').addEventListener('click', startTimer)

document.getElementById('stop').addEventListener('click', stopTimer)

document.getElementById('reset').addEventListener('click', resetTimer)







const gmailCheck = async () => {
    const gmailInput = document.querySelector('#gmail_input')
    const gmailResult = document.querySelector('#gmail_result')
    const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

    try {
        if (regExp.test(gmailInput.value)) {
            gmailResult.innerHTML = 'Верный Gmail адрес'
            gmailResult.style.color = 'green'
        } else {
            gmailResult.innerHTML = 'Не корректный адрес Gmail'
            gmailResult.style.color = 'red'
        }
    } catch (error) {
        console.error('Произошла ошибка при проверке Gmail:', error)
    }
};

const gmailCheckButton = document.querySelector('#gmail_button')
gmailCheckButton.addEventListener('click', gmailCheck)

const moveBlock = async () => {
    try {
        const box = document.querySelector('.child_block')
        let positionX = 0
        let positionY = 0
        const maxX = 448
        const maxY = 448

        const move = async () => {
            return new Promise((resolve) => {
                const moveInterval = setInterval(() => {
                    if (positionX < maxX && positionY === 0) {
                        positionX++
                        box.style.left = positionX + 'px'
                    } else if (positionX >= maxX && positionY < maxY) {
                        positionY++
                        box.style.top = positionY + 'px'
                    } else if (positionY >= maxY && positionX > 0) {
                        positionX--
                        box.style.left = positionX + 'px'
                    } else if (positionX <= 0 && positionY > 0) {
                        positionY--
                        box.style.top = positionY + 'px'
                    } else {
                        clearInterval(moveInterval)
                        resolve()
                    }
                }, 1)
            })
        }

        await move()
    } catch (error) {
        console.error('Произошла ошибка при выполнении движения:', error)
    }
}

moveBlock()