//DOMContentLoaded event.
document.addEventListener('DOMContentLoaded', function () {
    //Variables block inside DOMContentLoaded Event function
    const grid = document.getElementById('grid');
    const input = document.getElementById('quantity');
    const changeSizeBtn = document.querySelector('.grid-size');
    const clearBtn = document.querySelector('.reset');
    const rainbowBtn = document.querySelector('.rainbow-toggle');
    const drawBtn = document.querySelector('.draw');

    // Flag variable initializated false by default
    let rainbowMode = false;
    let isDrawing = false;
    let drawMode = false;

    document.body.addEventListener('mousedown', () => isDrawing = true);
    document.body.addEventListener('mouseup', () => isDrawing = false);

    //Function for handling multiple color draw.
    function getRandomColor() {
        //Local variables
        const hexadecimal = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += hexadecimal[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function applyColor(element) {
        if (rainbowMode) {
            element.style.backgroundColor = getRandomColor();
        } else {
            element.classList.add('color');
        }
    }

    //Function to create the grid of the board, takes the size as an argument
    function createGrid(size) {

        //Empty grid
        grid.innerHTML = '';

        //Applying styles
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        //Squares of the grid
        for (let i = 0; i < size * size; i++) {

            const square = document.createElement('div');
            square.classList.add('square');

            //When we put the cursor above this grid we'll draw with colours. So we need to use mousedown event
            square.addEventListener('mouseenter', function () {
                if (drawMode && isDrawing) {
                    applyColor(this);
                }
            });

            square.addEventListener('mousedown', function () {
                if (drawMode) {
                    applyColor(this);
                }
            });

            //Append square class to grid.
            grid.appendChild(square);
        }
    }

    //Event to manage draw button
    drawBtn.addEventListener('click', function(){
        drawMode = !drawMode;
        drawBtn.textContent = drawMode ? 'Drawing: ON' : 'Draw';
    });

    // Track mouse status
    document.addEventListener('mousedown', function () {
        isDrawing = true;
    });

    document.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    //Event to manage the size of the grid
    changeSizeBtn.addEventListener('click', function () {

        //Size variable 
        let size = parseInt(input.value);
        
        //That value must be an integer between 1 and 100
        if (!size || size < 1 || size > 100) {
            console.log('Please enter a number between 1 and 100');
            return;
        }
        
        //Call createGrid function
        createGrid(size);
    });

    //Switch values of the buttons.
    rainbowBtn.addEventListener('click', function () {
        rainbowMode = !rainbowMode;
        rainbowBtn.textContent = rainbowMode ? 'Normal Mode' : 'Rainbow Mode';
    });

    //Clear button
    clearBtn.addEventListener('click', function(){
        //Variable to select all the squares
        const squares = document.querySelectorAll('.square');

        //Then with a forEach control structure we clean every square of the grid.
        squares.forEach(square => {
            //Cleaning each square of the grid
            square.classList.remove('color');
            square.style.backgroundColor = '';
        })
    })

    // Default grid value on load
    createGrid(16);
});