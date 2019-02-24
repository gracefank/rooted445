// global variables to track player inventory and money
var inventory = [];
var money = 0;

// item class to be stored in the inventory array
class Item {
	constructor(name, cost) {
		this.name = name;
		this.cost = cost;

		// player starts with 0 of an item
		this.amount = 0;
	}

	// for placing an item in the world
	place() {
		alert("Placing item");
		this.stored = false;
	}

	// for storing an item
	store() {
		alert("Storing item");
		this.stored = true;
	}

	// player buys an item
	buy() {
		if (money >= this.cost) {
			money -= this.cost;
			this.amount++;
		}
	}
}


function setupInventory() {
	$.getJSON("data/items.json", function(data) {
		for (x in data.items) {
			newItem = new Item(data.items[x].name,
							   data.items[x].cost);
			//console.log(newItem.name);
			inventory.push(newItem);
		}
		whenDone();
    	// global_save_json = data.items;
    	// var countPosts = Object.keys(data.items).length;
    	// console.log(countPosts);
	});

    // let catnip = new Item("Catnip", 500, true);
    // let cactus = new Item("Cactus", 150, false);
    // let tulip = new Item("Tulip", 50, false);
    // let dandelion = new Item("Dandelion", 25, false);

    // inventory.push(catnip);
    // inventory.push(cactus);
    // inventory.push(tulip);
    // inventory.push(dandelion);
}

function whenDone() {
	console.log(inventory.length);
}