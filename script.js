const defaultColor = '#333333'
const defaultMode = 'color'
const defaultSize = 16

let currentColor = defaultColor
let currentMode = defaultMode
let currentSize = defaultSize

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const resetBtn = document.getElementById('resetBtn')
const grid = document.getElementById('grid')

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
resetBtn.onclick = () => {
    currentSize = defaultSize
    updateSizeValue(currentSize)
    reloadGrid()
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.setProperty("--columns-rows", size)
    for (i = 0; i < (size * size); i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('mouseover', changeColor)
        grid.appendChild(cell)
    }
}

function changeColor(e) {
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        currentColor = colorPicker.value
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
      } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
      } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
      }
    
      if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
      } else if (newMode === 'color') {
        colorBtn.classList.add('active')
      } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
      }
}

window.onload = () => {
    setupGrid(defaultSize)
    updateSizeValue(defaultSize)
    setCurrentMode('color')
}