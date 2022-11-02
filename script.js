/*
Closures needed for createGrid loops:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake
*/
let setBackground = function(element){
    element.style.backgroundColor = "black";
}

let restoreBackground = function(element){
    element.style.backgroundColor = "white";
}
let setBackgroundCallback = function(element){
    return function (){
        setBackground(element);
    };
}
let restoreBackgroundCallback = function(element){
    return function (){
        restoreBackground(element);
    };
}

let getGridDimensions = function (divElement) {
    // Not need this object. Because divElement is a square
    // we only need the width, for example.
    // CHANGE!!!
    let divDimensions = {
        height: divElement.offsetHeight -
            2 * parseFloat(getComputedStyle(divElement).borderWidth),
        width: divElement.offsetWidth -
            2* parseFloat(getComputedStyle(divElement).borderWidth)
        //In case we put border to the grids the value is
        // 34 = 16 * 2 + 2 * 1
        //    16 sides and two borders per grids plus 2 borders for
        //the grid container.
    };
    return divDimensions;
    
}
let createGrid = function (side){
    let theDivGrid = document.querySelector('.grid');
    let gridDimensions = getGridDimensions(theDivGrid);
    console.log(gridDimensions);
    let element = null;
    let elementDimensions = gridDimensions.width/side + "px";
    console.log(elementDimensions);
    for(let i = 0; i< side ; ++i){
        for (let j = 0 ; j < side ; ++j){
            element = document.createElement("div");
            element.style.height = elementDimensions;
            element.style.width = elementDimensions;
            element.addEventListener("mouseenter", setBackgroundCallback(element));
            theDivGrid.append(element);
            //elementBorder = getComputedStyle(element).borderWidth;
            //console.log("Border: " + elementBorder);
        }
    }

}

window.onload = function(){ createGrid(16,16);};
