const GRID_WIDTH = 500;


const start = document.getElementById("start");
const end = document.getElementById("end");
const block = document.getElementById("block");
const reset = document.getElementById("reset");


//to set the widths of the buttons equally (lines 8 to 12)
const maxWidth = Math.max(start.offsetWidth, end.offsetWidth);
end.style.width = `${maxWidth}px`;
start.style.width = `${maxWidth}px`;
block.style.width = `${maxWidth}px`;
reset.style.width = `${maxWidth}px`;



const Green = "rgb(84, 245, 66)";
const Red = "rgb(252, 52, 3)";
const LightGrey = "rgb(208, 208, 215)";
const Cyan = "rgb(173, 216, 230)";

let color = Cyan;
let content = "";
let startColor = LightGrey, endColor = LightGrey;





function  convertToHex(color){
    let rgbValue = color.match("")
}

let instructionButtonClicked = (button) => {

    //if start button is clicked
    if (button === "start") {
        let w = window.getComputedStyle(start);
        let buttonColor = w.getPropertyValue("background-color");

        //activate start button
        if (buttonColor === LightGrey){
            color = Green;
            content = "SP";
            start.style.backgroundColor = Green;

            //set other buttons color to default colors
            end.style.backgroundColor = LightGrey;
            block.style.backgroundColor = LightGrey;
        }
        //deactivate start button
        else if (buttonColor === Green){
            color = Cyan;
            content = "";
            start.style.backgroundColor = LightGrey;

        }
    }

    // if end button is clicked
    else if (button === "end"){
        let w = window.getComputedStyle(end);
        let buttonColor = w.getPropertyValue("background-color");

        //activate end button
        if (buttonColor === LightGrey){
            color = Green;
            content = "EP";
            end.style.backgroundColor = Green;

            //set other buttons color to default colors
            start.style.backgroundColor = LightGrey;
            block.style.backgroundColor = LightGrey;
        }
        //deactivate end button
        else if (buttonColor === Green){
            color = Cyan;
            content = "";
            end.style.backgroundColor = LightGrey;
        }
    }

    //if block button is clicked
    else if (button === "block"){
        let w = window.getComputedStyle(block);
        let buttonColor = w.getPropertyValue("background-color");
        //activate block button
        content = "";
        if (buttonColor === LightGrey){
            color = Red;
            block.style.backgroundColor = Red;

            //set other buttons color to default colors
            start.style.backgroundColor = LightGrey;
            end.style.backgroundColor = LightGrey;
        }
        //deactivate block button
        else if (buttonColor === Red){
            color = Cyan;
            block.style.backgroundColor = LightGrey;
        }
    }

    //if reset button is clicked
    else if (button === "reset") {
        let buttons = document.getElementsByClassName("buttons");
        for (let button of buttons)
            resetButtonProperties(button);

    }


}



function resetButtonProperties(button){
    button.textContent = "";
    button.className = "buttons";
    button.style.backgroundColor = Cyan;
}

function gridButtonClicked(grid) {
    let buttons = document.getElementsByClassName("buttons");

    let w1 = window.getComputedStyle(start), w2 = window.getComputedStyle(end);
    let startColor = w1.getPropertyValue("background-color"), endColor = w2.getPropertyValue("background-color");

    if (startColor === Green){
        for (let button of buttons){
            if (button.textContent != "EP")
                resetButtonProperties(button);
        }
    }

    else if (endColor === Green){
        for (let button of buttons){
            if (button.textContent != "SP")
                resetButtonProperties(button);
        }
    }



    grid.style.backgroundColor = color;
    grid.textContent = content;

}







//setting the decrease and increase column buttons to same width
const columnDecreaseButton = document.getElementById("columnDecreaseButton");
const columnIncreaseButton = document.getElementById("columnIncreaseButton");

let cDWidth = columnDecreaseButton.offsetWidth;
let cIWidth = columnIncreaseButton.offsetWidth;


let cMaxWidth = Math.max(cDWidth,cIWidth);
columnDecreaseButton.style.width = columnIncreaseButton.style.width = `${cMaxWidth}px`;


//setting decrease and increase row buttons to same width
const rowDecreaseButton = document.getElementById("rowDecreaseButton");
const rowIncreaseButton = document.getElementById("rowIncreaseButton");

let rDWidth = rowDecreaseButton.offsetWidth;
let rIWidth = rowIncreaseButton.offsetWidth;

let rMaxWidth = Math.max(rDWidth, rIWidth);
rowDecreaseButton.style.width = rowIncreaseButton.style.width = rMaxWidth;



//adding functionalities to row and column increase and decrease


const grid = document.getElementsByClassName("grid")[0];
const BoxTwo = document.getElementsByClassName("boxTwo")[0];
const BigBoxOne = document.getElementsByClassName("bigBoxOne")[0];

console.log(grid);




function increaseColumn(){
    let currColumn = window.getComputedStyle(grid).getPropertyValue("grid-template-columns").split(" ").length;
    let currRow = window.getComputedStyle(grid).getPropertyValue("grid-template-rows").split(" ").length;

    if (currColumn == 20)  return;

    for (let i = 0 ; i < currRow; i++){
        let gridButton = document.createElement("div");
        gridButton.className = "buttons";
        gridButton.addEventListener("click", () => gridButtonClicked(gridButton));
        grid.appendChild(gridButton);
    }
    currColumn++;




    grid.style.gridTemplateColumns = `repeat(${currColumn}, 70px)`;



    //to update width of bigBoxOne element
    BoxTwo.style.width = `${parseInt(window.getComputedStyle(BoxTwo).getPropertyValue("width").match("[0-9]+")[0])+70}px`;


}


function increaseRow(){
    let currColumn = window.getComputedStyle(grid).getPropertyValue("grid-template-columns").split(" ").length;
    let currRow = window.getComputedStyle(grid).getPropertyValue("grid-template-rows").split(" ").length;

    for (let i = 0 ; i < currColumn; i++){
        let gridButton = document.createElement("div");
        gridButton.className = "buttons";
        gridButton.addEventListener("click", () => gridButtonClicked(gridButton));
        grid.appendChild(gridButton);
    }

    currRow++;

    grid.style.gridTemplateRows = `repeat(${currRow}, 70px)`;

    //to update width of bigBoxOne element
    BigBoxOne.style.height = `${parseInt(window.getComputedStyle(BigBoxOne).getPropertyValue("height").match("[0-9]+")[0])+70}px`;


}


function decreaseColumn(){
    let currRow = window.getComputedStyle(grid).getPropertyValue("grid-template-rows").split(" ").length;

    if (currColumn == 1) return;



    for (let i = 0 ; i < currRow; i++){
        let gridButton = grid.lastElementChild;
        grid.removeChild(gridButton);
    }
    currColumn--;


    grid.style.gridTemplateColumns = `repeat(${currColumn}, 70px)`;

    BoxTwo.style.width = `${parseInt(window.getComputedStyle(BoxTwo).getPropertyValue("width").match("[0-9]+")[0])-70}px`;
}

function decreaseRow(){
    let currColumn = window.getComputedStyle(grid).getPropertyValue("grid-template-columns").split(" ").length;
    let currRow = window.getComputedStyle(grid).getPropertyValue("grid-template-rows").split(" ").length;

    if (currRow == 1) return;

    for (let i = 0 ; i < currColumn; i++){
        let gridButton = grid.lastElementChild;
        grid.removeChild(gridButton);
    }
    currRow--;
    grid.style.gridTemplateRows = `repeat(${currRow}, 70px)`;
    BigBoxOne.style.height = `${parseInt(window.getComputedStyle(BigBoxOne).getPropertyValue("height").match("[0-9]+")[0])-70}px`;
}
