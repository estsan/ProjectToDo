let items = new Array();
let bigBox = document.querySelector("#big")
let addItem = document.querySelector("#text-add")
let listItem = document.querySelector("#list-item");
let bottomRow = document.querySelector("#bottom");

listItem.remove();

function BigBox(isPresent) {
    let place = document.querySelector("body");
    let foot = document.querySelector("footer");
    if (isPresent) {
        bigBox.remove();
    }
    else {
        place.insertBefore(bigBox, foot);
    }
}


addItem.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        if (items === null){
            BigBox(false);
        }
        let newListItem = listItem;
        bigBox.insertBefore(newListItem, bottomRow);
    }
});

let checks = document.querySelector("#check-all");
checks.onclick = event => {
    event.preventDefault();
    BigBox(false);
};

let clears = document.querySelector("#clear");
clears.onclick = event => {
    event.preventDefault();
    BigBox(true);
};
BigBox(true);