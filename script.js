/*
Closures needed for createGrid loops:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake
*/




let restoreBackground = function(element, backgroundColor){
    element.style.backgroundColor = backgroundColor;
}

let restoreBackgroundCallback = function(element, bgColor){
    return function (){
        restoreBackground(element, bgColor);
    };
}

let setBackground = function(element){
    console.log(enteredBackgroundColor);
    if(random){
        element.style.backgroundColor = "#" + randomColor();
    }else{
        element.style.backgroundColor = enteredBackgroundColor;
    }
}

let setBackgroundCallback = function(element){
    return function (){
        setBackground(element);
    };
}



let calculateGridDimensions = function(divElement){
    return divElement.offsetHeight - 2 * parseFloat(getComputedStyle(divElement).borderWidth);
}
let  calculateGridElementDimensions = function(gridDimensions, gridElement)
{    
    return gridDimensions - 2*(parseFloat(getComputedStyle(gridElement).borderWidth));    
}

let emptyGrid = function (divGrid){
    while(divGrid.firstChild){
        divGrid.removeChild(divGrid.firstChild);
    }
}
let createGrid = function (side){
    let theDivGrid = document.querySelector('.grid');
    let gridDimensions = calculateGridDimensions(theDivGrid);
    let elementDimensions = 0;
    let element = null;


    emptyGrid(theDivGrid);
    sliderControls(side);
    
    for(let i = 0; i< side ; ++i){
        for (let j = 0 ; j < side ; ++j){
            element = document.createElement("div");            
            element.addEventListener("mouseenter", setBackgroundCallback(element));
            theDivGrid.append(element);
            if (elementDimensions === 0){
                elementDimensions = calculateGridElementDimensions(gridDimensions/side,element);
            }            
            element.style.height = elementDimensions + "px";
            element.style.width = elementDimensions + "px";
        }
    }
    return theDivGrid;

}

let sliderControls = function (side){
    let rangeText = document.querySelector(".slider-text");
    rangeText.innerText = side + " x " + side;
    let slider = document.querySelector('.slider');
    
    slider.addEventListener ("input", (e) => {
        rangeText.innerText = e.target.value + "x" + e.target.value;
    });
    slider.addEventListener("change", (e) => {        
        createGrid(e.target.value);
    });
    return;
}

let randomColor = function (){
    return Math.floor(Math.random()*16777215).toString(16);
}

let buttonRandomColor = function (){
    let btn = document.querySelector("button");

    btn.addEventListener("click", (e) => {
        random = true;
    });
    return;
}

let backgroundColor = "white";
let enteredBackgroundColor = "black";
let random = false;

let app = function (){
    
    let side = 16;
    createGrid(side, enteredBackgroundColor);
    sliderControls(side, enteredBackgroundColor);
    buttonRandomColor();
}
window.onload = function(){ app();}
