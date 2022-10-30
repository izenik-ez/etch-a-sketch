let createGrid = function (side){
    //let theGrid = document.getElementsByClassName('grid');
    let theDivGrid = document.querySelector('.grid');
    let element = null;
    for(let i = 0; i< side ; ++i){
        element = document.createElement("div");
        element.style.border = "1px solid black";
        element.setAttribute("data-key", i);
        theDivGrid.append(element);
    }

}

//window.addEventListener("load", createGrid(16,16));
window.onload = function(){ createGrid(16,16);};
