const defaultSize = 32

let currentSize = defaultSize

function setCurrentSize(newSize) {
    currentSize = newSize
}

const gridContainer = document.querySelector('#grid-container')
const sizeSlider = document.querySelector('#size-slider')

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    let gridSizeDisplay = document.querySelector('.grid-size-display')
    gridSizeDisplay.innerHTML = `${value}` + ' x ' + `${value}`
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

function clearGrid() {
    gridContainer.innerHTML = ''
}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let x = 0; x < size; x++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            row.appendChild(cell)
        }
        gridContainer.appendChild(row)
    }
}

createGrid(currentSize)