let items = new Array();
let bigBox = document.querySelector("#big")
let addItem = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");

listItem.remove();

function BigBox(add) {
    let place = document.querySelector("body");
    let foot = document.querySelector("footer");
    if (add) {
        place.insertBefore(bigBox, foot);
    }
    else {
        bigBox.remove();
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
}


addItem.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        if (items.length === 0){
            BigBox(true);
        }
        var item = addItem.value;
        AddItem(item);
    }
});

let checks = document.querySelector("#check-all");
checks.onclick = event => {
    event.preventDefault();
    BigBox(true);
};

let clears = document.querySelector("#clear");
clears.onclick = event => {
    event.preventDefault();
    BigBox(false);
};
BigBox(false);