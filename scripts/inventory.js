// global variables to track player inventory and money
var inventory = [];
var money = 0;

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
		}	}

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
	$.getJSON("data/items.json", function(data) {
		for (x in data.items) {
			newItem = new Item(data.items[x].name,
							   data.items[x].cost,
							   data.items[x].description,
							   data.items[x].imgpath);

			console.log("Key: " + data.items[x].key);
			inventory[data.items[x].key] = newItem;
		}
		whenDone();
	});
}

function whenDone() {
	console.log("Inventory created");
}
