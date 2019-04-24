
var lastFrameTimeMs = Date.now(); // The last time the loop was run
var maxFPS = 1; // The maximum FPS we want to allow
var timestamp = 0; // The current global game time
var totalUpdates = 0;


function update() {
    // this function is run each time the game updates
    totalUpdates++;
    console.log(Date.now());

    if(totalUpdates % 5 == 0){
        //try to spawn visitors
        randVisitor();
        //try to remove visitors
        deleteVisitor();
    }
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
        this.description = description;
        this.imgpath = imgpath;

        // player starts with 0 of an item in inventory
        this.amountStored = 0;

        // player starts with 0 of an item placed in the world
        this.amountPlaced = 0;
    }

    // for placing an item in the world
    place() {
        if (this.amountStored > 0) {
            console.log("Placing item " + this.name);
            this.amountStored--;
            this.amountPlaced++;
            return true;
        }
        else {
            // not an available item in the inventory
            return false;
        }
    }

    // for storing an item
    store() {
        if (this.amountPlaced > 0) {
           console.log("Storing item " + this.name);
            this.amountStored++;
            this.amountPlaced--;
        }
    }

    // player buys an item
    buy() {
        if (myScore >= this.cost) {
            myScore -= this.cost;
            this.amountStored++;
            document.getElementById("currMoney").innerHTML = myScore;
        }
    }
}

// request and parse the JSON file containing the items
function setupInventory() {
    $.getJSON("../data/items.json", function (data) {
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

function buyItem(val) {
    console.log(" the function value is " + inventory[val].cost);
    inventory[val].buy();
}

function randVisitor() {
    var randVisitor = visitors[Math.floor(Math.random() * visitors.length)];
    var randLocation = locations[Math.floor(Math.random() * locations.length)];
    // console.log(randLocation);

    var img = document.createElement("img");
    if (randVisitor == "assets/raccoon.gif") {
        img.style.width = '120%';
    }
    img.src = randVisitor;
    img.className = "visitor";

    var loc = document.getElementById(randLocation);

    if (loc.childNodes.length === 1) {
        //  console.log(loc.childNodes[0]);
        if (loc.childNodes[0].className != "visitor") {
            //  console.log("true");
            loc.appendChild(img);
            myScore += 10;
            document.getElementById("currMoney").innerHTML = myScore;
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

    var removedId = itemID.substr(0, itemID.indexOf(':'));
    inventory[removedId].store(); 

    console.log("removing item with ID " + itemID);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = 'copy';
    console.log("dragging item " + ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (inventory[data].place()) {
        var newitem = ev.target.appendChild(document.getElementById(data).cloneNode(true));
        document.getElementById(data).setAttribute("draggable", "false");
        document.getElementById(data).setAttribute("ondragstart", "drag(event)");
        document.getElementById(data).setAttribute("ondblclick", "removeItem(this.id)");
        counter = counter + 1;
        //newitem.id = ev.currentTarget.id + counter;
        newitem.id = data + ":" + counter;
        ev.target.style.backgroundImage = "none";
        console.log("dropping item " + data);
    }
}
