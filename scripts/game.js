

function update() {
    // this function is run each time the game updates
    console.log(Date.now());
}

function startGame() {
    // everything in here gets run after the DOM is loaded

    // if we split up the .js scripts, use loadScript() here to force load order

    document.getElementById("currMoney").innerHTML = myScore;
    setupInventory();


    // Start things off
    requestAnimationFrame(mainLoop);
}

function mainLoop() {
    // this function drives the game to run at constant speed
    // see update() to add actions to do each update
    timestamp = Date.now();
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    update();
    lastFrameTimeMs = timestamp;
    requestAnimationFrame(mainLoop);
}



// item class to be stored in the inventory array
class Item {
    constructor(name, cost, description, imgpath) {
        this.name = name;
        this.cost = cost;
        this.imgpath = imgpath;

        // player starts with 0 of an item in inventory
        this.amountStored = 0;

        // player starts with 0 of an item placed in the world
        this.amountPlaced = 0;
    }

    // for placing an item in the world
    place() {
        console.log("Placing item " + this.name);
        if (this.amountStored >= 0) {
            amountStored--;
            amountPlaced++;
        }
    }

    // for storing an item
    store() {
        console.log("Storing item " + this.name);
        if (this.amountPlaced >= 0) {
            amountStored++;
            amountPlaced--;
        }
    }

    // player buys an item
    buy() {
        if (money >= this.cost) {
            money -= this.cost;
            this.amountStored++;
        }
    }
}

// request and parse the JSON file containing the items
function setupInventory() {
    $.getJSON("data/items.json", function (data) {
        for (x in data.items) {
            newItem = new Item(data.items[x].name,
                data.items[x].cost,
                data.items[x].description,
                data.items[x].imgpath);

            // 	console.log("Key: " + data.items[x].key);
            inventory[data.items[x].key] = newItem;
        }
        whenDone();
    });
}

function whenDone() {
    console.log("Inventory created");
}



function openNav(evt, tabName) {
    var x = window.matchMedia("(max-width: 776px)")
    if (x.matches) { // If media query matches
        document.getElementById(tabName).style.width = "100%";
        document.getElementById(tabName).style.top = "490px";
        document.getElementById(tabName).style.height = "20vh";
        document.getElementById(tabName).style.display = "block";
        console.log("open-mobile");
    } else {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.height = "80%";
        document.getElementById(tabName).style.top = "90px";
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).style.width = "310px";
        evt.currentTarget.className += " active";
    }
}

function closeNav() {
    document.getElementById("inventory").style.width = "0";
    document.getElementById("store").style.width = "0";
    document.getElementById("main").style.right = "8px";
}

function retrieInventoryPrice(item) {

    $.getJSON("../scripts/data/items.json", function (data) {
        for (x in data.items) {
            if (item === data.items[x].key) {
                return data.items[x].cost;
            }
        }
        return 2;
    });
}

function buyItem(val) {
    console.log(" the function value is " + retrieInventoryPrice(val));
    if (myScore >= 5) {

        myScore = myScore - 2;
        document.getElementById("currMoney").innerHTML = myScore;
    }
    else {
        alert("Sorry, you do not have enough funds");
    }
}

function displayVisitor() {
    randVisitor();
    myScore += 10;
    document.getElementById("currMoney").innerHTML = myScore;
}


function randVisitor() {
    var randVisitor = visitors[Math.floor(Math.random() * visitors.length)];
    var randLocation = locations[Math.floor(Math.random() * locations.length)];
    // console.log(randLocation);

    var img = document.createElement("img");
    img.src = randVisitor;
    img.className = "visitor";

    var loc = document.getElementById(randLocation);

    if (loc.childNodes.length === 1) {
        //  console.log(loc.childNodes[0]);
        if (loc.childNodes[0].className != "visitor") {
            //  console.log("true");
            loc.appendChild(img);
        }
    }
}

function deleteVisitor() {
    var randLocation = locations[Math.floor(Math.random() * locations.length)];

    var loc = document.getElementById(randLocation);

    if (loc.childNodes.length == 2) {
        //  console.log(loc.childNodes[1]);
        loc.removeChild(loc.childNodes[1]);
    }
}



function removeItem(itemID) {
    console.log(itemID);
    var parent = document.getElementById(itemID).parentNode;
    parent.style.backgroundImage = "url('assets/down-arrow.png')";
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = 'copy';
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var newitem = ev.target.appendChild(document.getElementById(data).cloneNode(true));
    document.getElementById(data).setAttribute("draggable", "false");
    document.getElementById(data).setAttribute("ondragstart", "drag(event)");
    document.getElementById(data).setAttribute("ondblclick", "removeItem(this.id)");
    counter = counter + 1;
    newitem.id = ev.currentTarget.id + counter;
    ev.target.style.backgroundImage = "none";
}