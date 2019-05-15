let items = new Array();

// BigBox(true);

let bigBox = document.querySelector("#big")
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