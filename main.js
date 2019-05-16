// Instansvariabler
let items = new Array();
let bigBox = document.querySelector("#big")
let addItem = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");
let checkAllImg = document.querySelector("#check-all-img");
let checks = document.querySelector("#check-all");
let clears = document.querySelector("#clear");

// Denna är bara med tills CSSen är som den ska
listItem.remove();

// Funktioner
function AddBigBox(add) {
    let place = document.querySelector("body");
    let foot = document.querySelector("footer");
    if (add) {
        place.insertBefore(bigBox, foot);
        checkAllImg.src = "pictures/arrow-dark.png";
    }
    else {
        bigBox.remove();
        checkAllImg.src = "pictures/arrow-light.png";
    }
}

function AddItem(label) {
    var div = document.createElement("div");
    div.id = "list-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "check";
    var label1 = document.createElement("label");
    label1.for = "check";
    var img1 = document.createElement("img");
    img1.src = "pictures/check.png";
    var label2 = document.createElement("label");
    var text = document.createTextNode(label);
    var button = document.createElement("button");
    var img2 = document.createElement("img");
    img2.src = "pictures/x.png";

    div.appendChild(input);
    div.appendChild(label1);
    label1.appendChild(img1);
    div.appendChild(label2);
    label2.appendChild(text);
    div.appendChild(button);
    button.appendChild(img2);
    
    bigBox.insertBefore(div, bottomRow);
    
    button.onclick = event => {
        div.remove();
        items.splice(items.indexOf(div), 1);
    }

    items.push(div);
}


// Events
addItem.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        if (items.length === 0){
            AddBigBox(true);
        }
        var item = addItem.value;
        AddItem(item);
        addItem.value = "";
    }
});

checks.onclick = event => {
    event.preventDefault();
    AddBigBox(true);
};

clears.onclick = event => {
    event.preventDefault();
    AddBigBox(false);
};


// Snyggt byggt
AddBigBox(false);