// Instansvariabler
let allItems = new Array();
let doneItems = new Array();
let activeItems = new Array();
let bigBox = document.querySelector(".big")
let addItemTextbox = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");
let checkAll = document.querySelector('#check-all');
let clearCompleted = document.querySelector("#clear");
let itemsLeftLabel = document.querySelector("#items-left");
var i = 0;

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
    sessionStorage.removeItem(div.children[0].getAttribute("id"));
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
    div.setAttribute('class', "list-item");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = 'check' + i;
    input.setAttribute('class', 'circle-check');

    var label = document.createElement("label");
    label.setAttribute("class", "item-label");
    var text = document.createTextNode(thisLabel);
    var button = document.createElement("button");
    button.setAttribute("class", "delete-item");
    
    div.appendChild(input);
    div.appendChild(label);
    label.appendChild(text);
    div.appendChild(button);

    if (location.hash === '#completed') {
        if (!active) {
            AddItemVisually(div);
        }
    }
    else {
        AddItemVisually(div);
    }
    
    input.onclick = () => {
        //event.preventDefault();
        ChangeBetweenDoneAndNotDone(div);
    };
    
    button.onclick = event => {
        RemoveItem(div);
    }

    label.addEventListener("dblclick", function() {
        var textbox = document.createElement("input");
        textbox.setAttribute("type", "textbox");
        textbox.setAttribute("class","editbox")
        textbox.value = div.children[2].innerHTML;// from ;
        label.replaceWith(textbox);

        textbox.addEventListener("keydown", function(e) {
            var item = textbox.value;
            if (e.keyCode === 13){
                if (item !== "") {
                    textbox.replaceWith(label);
                    label.innerHTML = item;
                    label.setAttribute("class", "item-label");
                    
                    var key = input.getAttribute("id");
                    sessionStorage.removeItem(key);
                    if (active) { var value = [ 'y', item]; }
                    else {var value = ['n', item]; }
                    sessionStorage.setItem(key, JSON.stringify(value));
                }
                else {
                    RemoveItem();
                }
            }
        });
    });

    allItems.push(div);
    if (active) {
        activeItems.push(div);
        input.checked = false; 
    }
    else { 
        doneItems.push(div); 
        label.style.textDecoration = 'line-through';
        label.style.color = '#d9d9d9';
        input.checked = true;
    }
    UpdateItemsLeft();

    var key = input.getAttribute("id");
    if (active) { var value = [ 'y', thisLabel]; }
    else {var value = ['n', thisLabel]; }
    sessionStorage.setItem(key, JSON.stringify(value));

    
    i++;
}

function AddItemVisually(div) {
    bigBox.insertBefore(div, bottomRow);
}

function ChangeBetweenDoneAndNotDone(div) {
    lbl1 = div.children[1];
    cb = div.children[0];
    if (activeItems.includes(div)) {
        cb.checked = true;
        doneItems.push(div);
        activeItems.splice(activeItems.indexOf(div), 1);
        UpdateItemsLeft();
        var key = div.children[0].getAttribute("id");
        var value = JSON.parse(sessionStorage.getItem(key));
        sessionStorage.removeItem(key);
        value[0] = 'n';
        sessionStorage.setItem(key, JSON.stringify(value));
        lbl1.style.textDecoration = 'line-through';
        lbl1.style.color = '#d9d9d9';
        if ( location.hash === "#active" ) {
            div.remove();
        }
    }
    else {
        cb.checked = false;
        activeItems.push(div);
        doneItems.splice(doneItems.indexOf(div), 1);
        UpdateItemsLeft();
        var key = div.children[0].getAttribute("id");
        var value = JSON.parse(sessionStorage.getItem(key));
        sessionStorage.removeItem(key);
        value[0] = 'y';
        sessionStorage.setItem(key, JSON.stringify(value));
        lbl1.style.textDecoration = 'none';
        lbl1.style.color = '#777777';
        if ( location.hash === "#completed" ) {
            AddItemVisually(div);
        }
    }

}

// Change the appearence on the button next to the textbox when all tasks are marked
function TopRowButtonChange() {
    var activeNumber = activeItems.length;
    var allNumber = allItems.length;
    if ( activeNumber === 0 && allNumber !== 0 ){
        checkAll.checked = true;
    }
    else{
        checkAll.checked = false;
    }
}

// Events

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

window.addEventListener('hashchange', function() {
    var aLinks = document.querySelectorAll("a");
    for (k = 0; k < aLinks.length; k++){
        aLinks[k].removeAttribute("class");
    }
    if (location.hash === "#active") {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < activeItems.length; i++) {
            AddItemVisually(activeItems[i]);
        }
        var str = "[href=\"#active\"]";
    }    
    else if (location.hash === "#completed") {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < doneItems.length; i++) {
            AddItemVisually(doneItems[i]);
        }
        var str = "[href=\"#completed\"]";
    }    
    else {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
        for (var i = 0; i < allItems.length; i++) {
            AddItemVisually(allItems[i]);
        }
        var str = "[href=\"#\"]";
    }
    var selected = document.querySelector(str);
    selected.setAttribute("class", "selected");
}, false);

// Make the page look as wanted when we start

AddBigBox(false);

if (sessionStorage.length !== 0){
    AddBigBox(true);
    var tempLables = new Array();
    var k = 0;
    var sant = true;
    while (true) {    
        var keyName = 'check' + k;
        if (sessionStorage.getItem(keyName) !== null) { 
            var valueName = sessionStorage.getItem(keyName);
            tempLables.push(valueName);
        }
        else {console.log('skipped');}
        if (sessionStorage.length === tempLables.length) {
            break;
        }
        k++;
    }
    sessionStorage.clear();
    
    for (var j = 0; j < tempLables.length; j++) {
        var value = JSON.parse(tempLables[j]);

        var active = value[0] === 'y';
        var label = value[1];
        AddItemToContext(label, active);
    }
    console.log(sessionStorage);
    console.log(tempLables);
}

// check hash
if ( location.hash === "#active" ) {
    for (k = 0 ; k < doneItems.length; k++) {
        doneItems[k].remove();
    }
    var str = "[href=\"#active\"]";
    var selected = document.querySelector(str);
    selected.setAttribute("class", "selected");
}
else if ( location.hash === "#completed" ) {
    for (k = 0 ; k < activeItems.length; k++) {
        activeItems[k].remove();
    }
    var str = "[href=\"#completed\"]";
    var selected = document.querySelector(str);
    selected.setAttribute("class", "selected");
}
else if (location.hash === "" ) {
    var str = "[href=\"#\"]";
    var selected = document.querySelector(str);
    selected.setAttribute("class", "selected");
}


