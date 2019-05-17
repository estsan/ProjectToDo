// Instansvariabler
let allItems = new Array();
let doneItems = new Array();
let bigBox = document.querySelector("#big")
let addItem = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");
let checkAllImg = document.querySelector("#check-all-img");
let checks = document.querySelector("#check-all");
let clears = document.querySelector("#clear");
let itemsLeft = document.querySelector("#jkl");
var i = 0;

// Denna är bara med tills CSSen är som den ska
listItem.remove();

// Funktioner
function AddBigBox(add) {
    let place = document.querySelector("body");
    let foot = document.querySelector("footer");
    if (add) {
        place.insertBefore(bigBox, foot);
    }
    else {
        bigBox.remove();
   }
}

function UpdateItemsLeft() {
    var number = allItems.length - doneItems.length;
    if (number !== 1) {
        itemsLeft.innerText = number + ' items left';
    }
    else {
        itemsLeft.innerText = '1 item left';
    }
    TopRowButtonChange();
}

function RemoveItem(div) {
    allItems.splice(allItems.indexOf(div), 1);
    if (doneItems.includes(div)) {
        doneItems.splice(doneItems.indexOf(div), 1);
    }
    if (allItems.length === 0) {
        AddBigBox(false);
    }
    div.remove();
    UpdateItemsLeft();
}

function AddItem(label) {
    var div = document.createElement("div");
    div.id = "list-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = 'check' + i;
    console.log(input.attributes);

    var label1 = document.createElement("label");
    label1.setAttribute("for", 'check' + i);
    console.log(label1.attributes);
    var img1 = document.createElement("img");
    img1.src = "pictures/circle.png";
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
    
    input.onclick = event => {
        //event.preventDefault();
        if ( RegExp('circle.png').test(img1.src) ) { //img1.src === "pictures/circle.png"){
            img1.src = "pictures/circle-check.png";
            doneItems.push(div);
        }
        else {
            img1.src = "pictures/circle.png";
            doneItems.splice(doneItems.indexOf(div), 1);
        }
        UpdateItemsLeft();
    }

    button.onclick = event => {
        RemoveItem(div);
    }
    allItems.push(div);
    UpdateItemsLeft();
    i++;
}

function TopRowButtonChange() {
    var number = allItems.length - doneItems.length;
    if ( number === 0 ){
        checkAllImg.src = "pictures/arrow-dark.png";
    }
    else{
        checkAllImg.src = "pictures/arrow-light.png";
    }
}

// Events
addItem.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        if (allItems.length === 0){
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
    var len = doneItems.length;
    for (var i = 0; i < len; i++){
        console.log(doneItems[0]);
        RemoveItem(doneItems[0]);        
    }

    // doneItems.forEach(function(element){
    //     console.log(element);
    //     RemoveItem(element);
    // });
};


// Snyggt byggt
AddBigBox(false);