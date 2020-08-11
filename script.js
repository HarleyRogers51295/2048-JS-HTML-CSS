document.addEventListener("DOMContentLoaded", () =>{
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const resultDisplay = document.querySelector("#result");
    const width = 4;//create the width
    let squares = [];//create the array
    let score = 0;//create score var

    //create the board
    function createBoard() { //this function creates the board
        for(let i = 0; i < width*width; i++){ //runds through and generates the different squares
            square = document.createElement("div"); //creates a div(square)
            square.innerHTML = 0; //sets its value
            gridDisplay.appendChild(square); //attaches these divs to the grid
            squares.push(square); //puts the square into the array sqaures
        }
        numGenerator();//generate the randim number
        numGenerator(); //do this twice to generate two numbers.
    }
    createBoard();//call the method the create the board


    //generate the num randomly
    function numGenerator() {
        randomeNumber = Math.floor(Math.random() * squares.length); //this makes a random number and ounds it
        if(squares[randomeNumber].innerHTML == 0){ //if the number is 0, make it 2!
            squares[randomeNumber].innerHTML = 2;
            gameOver();
        } else numGenerator();

    }

    //swipe right
    function swipeRight() {
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filterRow = row.filter(num => num);

                let missing = 4 - filterRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = zeros.concat(filterRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    //swipe left
    function swipeLeft() {
        for(let i = 0; i < width*width; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
    
                let filterRow = row.filter(num => num);
    
                let missing = 4 - filterRow.length;
                let zeros = Array(missing).fill(0);
                
                let newRow = filterRow.concat(zeros);//change this to be the opposite.
    
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    //swipe down
    function swipeDown(){
        for(let i = 0; i < width; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newCol = zeros.concat(filteredColumn);

            squares[i].innerHTML = newCol[0];
            squares[i + width].innerHTML = newCol[1];
            squares[i + (width * 2)].innerHTML = newCol[2];
            squares[i + (width * 3)].innerHTML = newCol[3];
        }
    }
    //swipe Up
    function swipeUp(){
        for(let i = 0; i < width; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newCol = filteredColumn.concat(zeros);

            squares[i].innerHTML = newCol[0];
            squares[i + width].innerHTML = newCol[1];
            squares[i + (width * 2)].innerHTML = newCol[2];
            squares[i + (width * 3)].innerHTML = newCol[3];
        }
    }



    //combine function row
    function combineRow() {
        for(let i = 0; i < width*width - 1; i++){
            if(squares[i].innerHTML === squares[i + 1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }
    //co,bine function column
    function combineCol() {
        for(let i = 0; i < width*width - 4; i++){
            if(squares[i].innerHTML === squares[i + width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }
    //assign keycodes
    function control(e){
        if(e.keyCode == 39){
            keyRight();
        } else if(e.keyCode == 37) {
            keyLeft();
        }else if(e.keyCode == 40){
            keyDown();
        }else if (e.keyCode == 38){
            keyUp();
        }
        
    }
    document.addEventListener("keyup", control);

    function keyRight(){
        swipeRight();
        combineRow();
        swipeRight();
        numGenerator();
    }
    function keyLeft(){
        swipeLeft();
        combineRow();
        swipeLeft();
        numGenerator();
    }
    function keyDown(){
        swipeDown();
        combineCol();
        swipeDown();
        numGenerator();
    }
    function keyUp() {
        swipeUp();
        combineCol();
        swipeUp();
        numGenerator();
    }


    //check for win!
    function checkForWin(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 2048){
            resultDisplay.innerHTML = "You Win!";
            document.removeEventListener("keyup", control);
            }
        }
    }
    //check for no zeros! game over!
    function gameOver() {
        var zeros = 0;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeros++;
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = "You Lose!!!";
            document.removeEventListener("keyup", control);
        }
    }
    
});