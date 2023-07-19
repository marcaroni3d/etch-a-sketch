/* DEFAULTS */
const defaultSize = 16
const defaultColor = '#333333'
const defaultMode = 'color'

let currentSize = defaultSize
let currentColor = defaultColor
let currentMode = defaultMode
let sketchMode = true

function setCurrentSize(newSize) {
    currentSize = newSize
}
function setCurrentColor(newColor) {
    currentColor = newColor
}
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

/* USER INTERFACE */
const gridContainer = document.getElementById('grid-container')
const sketchModeDisplay = document.getElementById('sketch-mode')
const colorInput = document.getElementById('color-input')
const colorBtn = document.getElementById('color-btn')
const warmBtn = document.getElementById('warm-btn')
const coldBtn = document.getElementById('cold-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser-btn')
const sizeInput = document.getElementById('size-input')
const resetBtn = document.getElementById('reset-btn')

colorInput.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
warmBtn.onclick = () => setCurrentMode('warm')
coldBtn.onclick = () => setCurrentMode('cold')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
sizeInput.onchange = (e) => changeSize(e.target.value)
sizeInput.onmousemove = (e) => updateSizeValue(e.target.value)
resetBtn.onclick = () => {
    currentSize = defaultSize
    updateSizeValue(currentSize)
    reloadGrid()
}
window.onclick = () => toggleSketch()

/* FUNCTIONS */
function toggleSketch() {
    sketchMode = !sketchMode
    updateSketchModeDisplay()
}
function updateSketchModeDisplay() {
    if (sketchMode) {
        sketchModeDisplay.innerText = 'On'
    }
    if (!sketchMode) {
        sketchModeDisplay.innerText = 'Off'
    }
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(newValue) {
    let gridSizeDisplay = document.querySelector('.size-value')
    sizeInput.value = newValue
    gridSizeDisplay.innerHTML = `${newValue}` + ' x ' + `${newValue}`
}

function updateColorValue(newValue) {
    colorInput.value = newValue
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

function clearGrid() {
    gridContainer.innerHTML = ''
}

function createGrid(size) {
    gridContainer.style.setProperty("--columns-rows", size)
    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div')
        cell.className = 'cell'
        cell.addEventListener('mouseover', changeColor)
        gridContainer.appendChild(cell)
    }
}

function changeColor(e) {
    if (sketchMode === false) {
        return
    }
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    }
    if (currentMode === 'warm') {
        const colors = ['#BF6A6D', '#A45256', '#EC6760', '#F88C5D', '#FDCF6D']
        const randomWarm = colors[Math.floor(Math.random() * colors.length)]
        e.target.style.backgroundColor = randomWarm
    }
    if (currentMode === 'cold') {
        const colors = ['#5590BC', '#0DABB8', '#01F0F6', '#1FFDE1', '#57FFC8']
        const randomCold = colors[Math.floor(Math.random() * colors.length)]
        e.target.style.backgroundColor = randomCold
    }
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        const randomColor = `rgb(${randomR}, ${randomG}, ${randomB})`
        e.target.style.backgroundColor = randomColor
    }
    if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'warm') {
        warmBtn.classList.remove('active')
    } else if (currentMode === 'cold') {
        coldBtn.classList.remove('active')
    } else if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'warm') {
        warmBtn.classList.add('active')
    } else if (newMode === 'cold') {
        coldBtn.classList.add('active')
    } else if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}

/* INIT */
window.onload = () => {
    createGrid(defaultSize)
    setCurrentMode(defaultMode)
    updateSizeValue(defaultSize)
    updateColorValue(defaultColor)
    updateSketchModeDisplay()
}
