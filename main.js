// Instansvariabler
let allItems = new Array();
let doneItems = new Array();
let activeItems = new Array();
let bigBox = document.querySelector("#big")
let addItemTextbox = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");
let checkAll = document.querySelector("#check-all-img");
let clearCompleted = document.querySelector("#clear");
let itemsLeftLabel = document.querySelector("#items-left");
var i = 0;

// Denna är bara med tills CSSen är som den ska
listItem.remove();

// Funktioner

// Adding or removing the lower part of the visual box
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

// Update number on label telling how many items are left
function UpdateItemsLeft() {
    var number = activeItems.length;
    if (number !== 1) {
        itemsLeftLabel.innerText = number + ' items left';
    }
    else {
        itemsLeftLabel.innerText = '1 item left';
    }
    TopRowButtonChange();
}

function RemoveItem(div) {
    allItems.splice(allItems.indexOf(div), 1);  
    sessionStorage.removeItem(div.children[1].getAttribute("for"));
    if (doneItems.includes(div)) {
        doneItems.splice(doneItems.indexOf(div), 1);
    }
    else {
        activeItems.splice(activeItems.indexOf(div), 1);
    }

    div.remove();
    UpdateItemsLeft();
    if (allItems.length === 0) {
        AddBigBox(false);
    }
}

function AddItemToContext(thisLabel, active) {
    var div = document.createElement("div");
    div.id = "list-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = 'check' + i;
    var label1 = document.createElement("label");
    label1.setAttribute("for", 'check' + i);
    var img1 = document.createElement("img");
    if (active) { img1.src = "pictures/circle.png"; }
    else { img1.src = "pictures/circle-check.png"; }
    var label2 = document.createElement("label");
    var text = document.createTextNode(thisLabel);
    var button = document.createElement("button");
    button.setAttribute("class", "ester");
    var img2 = document.createElement("img");
    img2.src = "pictures/x.png";
    
    div.appendChild(input);
    div.appendChild(label1);
    label1.appendChild(img1);
    div.appendChild(label2);
    label2.appendChild(text);
    div.appendChild(button);
    button.appendChild(img2);
        
    if (location.hash === "#active") {
        if (active) {
            AddItemVisually(div);
        }
    }
    else if (location.hash === '#completed') {
        if (!active) {
            AddItemVisually(div);
        }
    }
    else {
        AddItemVisually(div);
    }
    
    input.onclick = () => {
        event.preventDefault();
        ChangeBetweenDoneAndNotDone(div);
    };
    
    button.onclick = event => {
        RemoveItem(div);
    }

    label2.addEventListener("dblclick", function() {
        var textbox = document.createElement("input");
        textbox.setAttribute("type", "textbox");
        textbox.value = thisLabel + '\n';
        label2.replaceWith(textbox);



        textbox.addEventListener("keydown", function(e) {
            var item = textbox.value;
            if (e.keyCode === 13){
                if (item !== "") {
                    textbox.replaceWith(label2);
                    label2.innerHTML = item;

                    
                    var key = label1.getAttribute("for");
                    sessionStorage.removeItem(key);
                    if (active) { var value = [ 'y', item]; }
                    else {var value = ['n', item]; }
                    sessionStorage.setItem(key, JSON.stringify(value));
                    // Update sessionStorage
                }
                else {
                    RemoveItem();
                }
            }
        });
    });

    allItems.push(div);
    if (active) { activeItems.push(div); }
    else { doneItems.push(div); }
    UpdateItemsLeft();

    var key = label1.getAttribute("for");
    if (active) { var value = [ 'y', thisLabel]; }
    else {var value = ['n', thisLabel]; }
    sessionStorage.setItem(key, JSON.stringify(value));

    
    i++;
}

function AddItemVisually(div) {
    bigBox.insertBefore(div, bottomRow);
}

function ChangeBetweenDoneAndNotDone(div) {
    img1 = div.children[1].children[0];
    if (activeItems.includes(div)) {
        img1.src = "pictures/circle-check.png";
        doneItems.push(div);
        activeItems.splice(activeItems.indexOf(div), 1);
        UpdateItemsLeft();
        var key = div.children[1].getAttribute("for");
        var value = JSON.parse(sessionStorage.getItem(key));
        sessionStorage.removeItem(key);
        value[0] = 'n';
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    else {
        img1.src = "pictures/circle.png";
        activeItems.push(div);
        doneItems.splice(doneItems.indexOf(div), 1);
        UpdateItemsLeft();
        var key = div.children[1].getAttribute("for");
        var value = JSON.parse(sessionStorage.getItem(key));
        sessionStorage.removeItem(key);
        value[0] = 'y';
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

// Change the appearence on the button next to the textbox when all tasks are marked
function TopRowButtonChange() {
    var number = activeItems.length;
    if ( number === 0 ){
        checkAll.src = "pictures/arrow-dark.png";
    }
    else{
        checkAll.src = "pictures/arrow-light.png";
    }
}

// Events

function locationHashChanged() { 
    if (location.hash === '#') { 
      console.log("You're visiting a cool feature!"); 
    } 
  } 

addItemTextbox.addEventListener("keydown", function(e) {
    var item = addItemTextbox.value;
    if (e.keyCode === 13){
        if (item !== "") {
            if (document.getElementById("big") === null){
                AddBigBox(true);
            }
            AddItemToContext(item, true);
            addItemTextbox.value = "";
        }
    }
});

checkAll.onclick = event => {
    event.preventDefault();
    var all = allItems.length;
    var active = activeItems.length;
    for (var i = 0; i < all; i++){
        if (active === 0) {
            ChangeBetweenDoneAndNotDone(allItems[i]);
        }
        else {
            if (activeItems.includes(allItems[i])){
            ChangeBetweenDoneAndNotDone(allItems[i]);
            }
        }
    }
};

clearCompleted.onclick = event => {
    var len = doneItems.length;
    for (var i = 0; i < len; i++){
        RemoveItem(doneItems[0]);        
    }
};

// Make the page look as wanted when we start

AddBigBox(false);

if (sessionStorage.length !== 0){
    AddBigBox(true);
    var tempLables = new Array();
    for (var j = 0; j < sessionStorage.length; j++){
        var keyName = sessionStorage.key(j);
        var valueName = sessionStorage.getItem(keyName);
        tempLables[j] = valueName;
    }
    sessionStorage.clear();
    
    for (var j = 0; j < tempLables.length; j++) {
        var value = JSON.parse(tempLables[j]);

        var active = value[0] === 'y';
        var label = value[1];
        AddItemToContext(label, active);
    }
    console.log(sessionStorage);
}



window.addEventListener('hashchange', function() {
    if (location.hash === "#active") {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < activeItems.length; i++) {
            AddItemVisually(activeItems[i]);
        }
    }    
    else if (location.hash === "#completed") {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < doneItems.length; i++) {
            AddItemVisually(doneItems[i]);
        }
    }    
    else {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < allItems.length; i++) {
            AddItemVisually(allItems[i]);
        }
    }

}, false);