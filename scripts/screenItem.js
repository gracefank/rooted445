let screenObjects = [];

class ScreenItem {

    ScreenItem() {
        this.visiter = false;
        this.filled = false;
    }

    setItem(itemName) {
        this.item = itemName;
    }

    isVisiter() {
        return this.visiter;
    }

    setVisiter(visiterVal) {
        this.visiter = visiterVal;
    }

    getItem() {
        return this.item;
    }

    setFilled(filledVal) {
        this.filled = filledVal;
    }

    getFill() {
        return this.filled;
    }

}

for (let i = 0 ; i < 12; i++ ) {
    const screenItem = new ScreenItem();
    screenObjects.push(screenItem);
}
