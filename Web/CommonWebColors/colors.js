const colors = [
    "ivory", 
    "beige", 
    "wheat", 
    "tan", 
    "khaki", 
    "silver", 
    "gray", 
    "charcoal", 
    "navy", 
    "azure", 
    "cyan", 
    "aquamarine", 
    "teal", 
    "green", 
    "olive", 
    "chartreuse", 
    "lime", 
    "golden", 
    "goldenrod", 
    "coral", 
    "salmon", 
    "pink", 
    "fuchsia", 
    "puce", 
    "mauve", 
    "lavender", 
    "plum", 
    "indigo", 
    "maroon", 
    "crimson",
];

function generateColorDiv(colorName){
    let template = `
        <div class="color" style="background: ${colorName}">
            ${colorName}
        </div>
    `;
    return template;
}

function renderColorsToPage(colorNamesList, rootEleSelector){
    debugger
    if(!rootEleSelector) {
        console.info('Insert into body');
        rootEleSelector = document.documentElement;
    }else{
        rootEleSelector = document.querySelector("." + rootEleSelector);
    }

    let childrenString =  colorNamesList.reduce(function(acc, cur){
       acc += generateColorDiv(cur);
       return acc; 
    }, ""); 

    rootEleSelector.innerHTML = childrenString;
}

window.addEventListener('DOMContentLoaded', renderColorsToPage.bind(this, colors, "color-container"));
