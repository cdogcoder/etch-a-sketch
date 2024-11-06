// Understand the problem
// The task is to create an Etch-a-Sketch
// type program (really just a whiteboard)
// where the user can use their cursor to
// draw things on a canvas. (Using Odin's
// requirements) The canvas should be a
// grid of empty squares (each of the squares
// are like pixels on a screen essentially)
// and upon hovering over any one of them 
// with the cursor, the square gets filled
// in. The user should also be able to determine
// the size of the canvas, or how many squares 
// the width and the length the canvas should be
// (ex. if the user picks 15 as the size, the
// generated canvas will have a width and length
// of 15 squares). The creation of the canvas and
// the "square fill" effect when hovering over the
// squares should be done through DOM manipulation.

// My pseudocode
// 1. Create a function 'createGrid' that takes
//    in an integer type argument 'size' and 
//    creates a grid with a width and length of 
//    the desired 'size' value. The function should
//    be called upon pressing a button, which will 
//    prompt the user for a number asking for the size
//    of the grid. Once a valid value is given, the function
//    creates the container for the squares to go into
//    and use a nested for loop that uses 'size' to
//    populate it with the squares. The outer
//    for loop body should create a container that
//    holds a row of squares and the inner for loop
//    body should create an individual square with the
//    hover effect attached to it, which is then appended
//    as a child node to the container that holds the
//    row of squares. After the inner loop terminates, 
//    append the container that holds a row of squares 
//    to the main container of the squares. After the outer
//    loop terminates, append the main container to the body
//    of the screen somewhere.
// 2. Create a function 'fillSquare' that takes in an
//    event type argument 'event' and adds a class that
//    changes the background color of the event's target.
//    This function should be called when a user hovers
//    over any squares in the canvas and when it is called,
//    the function should use the 'event' argument and access
//    the 'target' property to add the class to it that will
//    "fill" the square in.

const baseContainer = document.querySelector('div');
const dimensionsButton = document.querySelector('button');
const maxSize = 100;
let darkeningFillOpacity = 0;
let gridDimensions;
const squareOptionsContainer = document.createElement('div');
const fillButton = document.createElement('button');
const eraseButton = document.createElement('button');
const resetButton = document.createElement('button');
const randomFillButton = document.createElement('button');
const darkeningFillButton = document.createElement('button');
fillButton.textContent = 'Fill';
eraseButton.textContent = 'Erase';
resetButton.textContent = 'Reset';
randomFillButton.textContent = 'Random Fill';
darkeningFillButton.textContent = 'Darkening Fill';
squareOptionsContainer.style.cssText = "display: flex; gap: 12px;";
squareOptionsContainer.appendChild(fillButton);
squareOptionsContainer.appendChild(eraseButton);
squareOptionsContainer.appendChild(resetButton);
squareOptionsContainer.appendChild(randomFillButton);
squareOptionsContainer.appendChild(darkeningFillButton);

function createGrid(size) {
    document.body.insertBefore(squareOptionsContainer, baseContainer);
    baseContainer.innerHTML = "";
    const mainContainer = document.createElement('div');
    mainContainer.style.cssText = "width: 100%; height: 100%; display: flex; flex-direction: column;";
    for (let i = 0; i < size; i++) {
        const rowOfSquares = document.createElement('div');
        rowOfSquares.style.cssText = "width: 100%; display: flex; flex: 1;";
        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.addEventListener('mouseover', fillSquare);
            square.style.cssText = "flex: 1; border: 1px solid black;";
            rowOfSquares.appendChild(square);
        }
        mainContainer.appendChild(rowOfSquares);
    }
    baseContainer.appendChild(mainContainer);
    return size**2;
}

dimensionsButton.addEventListener('click', () => {
    let size = maxSize + 1;
    while (size > maxSize || !Number.isInteger(size) || size == null || size == '') {
        size = +prompt("What dimensions do you want the grid to be? ");
    }
    gridDimensions = createGrid(size);
})

function fillSquare(event) {
    event.target.style.cssText = "flex: 1; border: 1px solid black; background-color: black;";
}

function eraseSquare(event) {
    event.target.style.cssText = "flex: 1; border: 1px solid black;";
}

function getRandomValue(numOfValues) {
    return Math.floor(Math.random() * numOfValues);
}

function randomFillSquare(event) {
    event.target.style.cssText = `flex: 1; border: 1px solid black; background-color: rgb(${getRandomValue(256)}, ${getRandomValue(256)}, ${getRandomValue(256)})`;
}

function darkeningFillSquare(event) {
    event.target.style.cssText = `flex: 1; border: 1px solid black; background-color: rgba(0,0,0,${darkeningFillOpacity})`;
    const proportion = 1 / gridDimensions;
    if (darkeningFillOpacity < 1) darkeningFillOpacity += proportion;
}

fillButton.addEventListener('click', () => {
    let mainContainer = baseContainer.childNodes[0];
    for (const row of mainContainer.childNodes) {
        for (const square of row.childNodes) {
            square.removeEventListener('mouseover', eraseSquare);
            square.removeEventListener('mouseoveer', randomFillSquare);
            square.removeEventListener('mouseover', darkeningFillSquare);
            square.addEventListener('mouseover', fillSquare);
        }
    }
})

eraseButton.addEventListener('click', () => {
    let mainContainer = baseContainer.childNodes[0];
    for (const row of mainContainer.childNodes) {
        for (const square of row.childNodes) {
            square.removeEventListener('mouseover', fillSquare);
            square.removeEventListener('mouseoveer', randomFillSquare);
            square.removeEventListener('mouseover', darkeningFillSquare);
            square.addEventListener('mouseover', eraseSquare);
        }
    }
})

resetButton.addEventListener('click', () => {
    let mainContainer = baseContainer.childNodes[0];
    for (const row of mainContainer.childNodes) {
        for (const square of row.childNodes) {
            square.style.cssText = "flex: 1; border: 1px solid black;";
            darkeningFillOpacity = 0;
        }
    }
})

randomFillButton.addEventListener('click', () => {
    let mainContainer = baseContainer.childNodes[0];
    for (const row of mainContainer.childNodes) {
        for (const square of row.childNodes) {
            square.removeEventListener('mouseover', eraseSquare);
            square.removeEventListener('mouseover', fillSquare);
            square.removeEventListener('mouseover', darkeningFillSquare);
            square.addEventListener('mouseover', randomFillSquare);
        }
    }
})            

darkeningFillButton.addEventListener('click', () => {
    let mainContainer = baseContainer.childNodes[0];
    for (const row of mainContainer.childNodes) {
        for (const square of row.childNodes) {
            square.removeEventListener('mouseover', eraseSquare);
            square.removeEventListener('mouseover', fillSquare);
            square.removeEventListener('mouseover', randomFillSquare);
            square.addEventListener('mouseover', darkeningFillSquare);
        }
    }
})