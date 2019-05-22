// Instansvariabler
let allItems = new Array();

let doneItems = new Array();
let bigBox = document.querySelector("#big")
let addItem = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");
let checkAll = document.querySelector("#check-all-img");
let checks = document.querySelector("#check-all");
let clears = document.querySelector("#clear");
let itemsLeft = document.querySelector("#items-left");
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
        checkAll.src = "pictures/arrow-light.png";
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
    sessionStorage.removeItem(div.children[1].getAttribute("for"));
    if (doneItems.includes(div)) {
        doneItems.splice(doneItems.indexOf(div), 1);
    }

    div.remove();
    UpdateItemsLeft();
    if (allItems.length === 0) {
        AddBigBox(false);
    }
}

function AddItem(label) {

    var div = document.createElement("div");
    div.id = "list-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = 'check' + i;

    var label1 = document.createElement("label");
    label1.setAttribute("for", 'check' + i);
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
    
    input.onclick = () => {
        event.preventDefault();
        ChangeBetweenDoneAndNotDone(div);
    };
    
    button.onclick = event => {
        RemoveItem(div);
    }
    allItems.push(div);
    UpdateItemsLeft();

    var key = label1.getAttribute("for");
    sessionStorage.setItem(key, label);
    
    i++;

}

function ChangeBetweenDoneAndNotDone(div) {
    img1 = div.children[1].children[0];
    if (!doneItems.includes(div)) {
        img1.src = "pictures/circle-check.png";
        doneItems.push(div);
        UpdateItemsLeft();
    }
    else {
        img1.src = "pictures/circle.png";
        doneItems.splice(doneItems.indexOf(div), 1);
        UpdateItemsLeft();
    }
}

function TopRowButtonChange() {
    var number = allItems.length - doneItems.length;
    if ( number === 0 ){
        checkAll.src = "pictures/arrow-dark.png";
    }
    else{
        checkAll.src = "pictures/arrow-light.png";
    }
}

// Events


addItem.addEventListener("keydown", function(e) {
    var item = addItem.value;
    if (item !== ""){
        if (e.keyCode === 13) {
            if (document.getElementById("big") === null){
                AddBigBox(true);
            }
            AddItem(item);
            addItem.value = "";
        }
    }
});

checkAll.onclick = event => {
    event.preventDefault();
    var len = allItems.length;


    var num = allItems.length - doneItems.length;
    for (var i = 0; i < len; i++){
        if (num === 0) {
            ChangeBetweenDoneAndNotDone(allItems[i]);
        }
        else {
            if (!doneItems.includes(allItems[i])){
            ChangeBetweenDoneAndNotDone(allItems[i]);
            }
        }
    }
};

clears.onclick = event => {
    var len = doneItems.length;
    for (var i = 0; i < len; i++){
        RemoveItem(doneItems[0]);        
    }
};


// Snyggt byggt
AddBigBox(false);

if (sessionStorage.length !== 0){
    AddBigBox(true);
    console.log(sessionStorage);
    var tempLables = new Array();
    for (var j = 0; j < sessionStorage.length; j++){
        var keyName = sessionStorage.key(j);
        var valueName = sessionStorage.getItem(keyName);
        tempLables[j] = valueName;
    }
    sessionStorage.clear();
    console.log(sessionStorage);
    console.log(tempLables);
    
    for (var j = 0; j < tempLables.length; j++) {
        AddItem(tempLables[j]);
    }
    console.log(sessionStorage);
}



// window.addEventListener('hashchange', function() {
//     console.log('The hash has changed!')
// }, false);