class Visiter {
    constructor(name, valueOfVisiter) {
        this.name = name;
        this.valueOfvisiter = valueOfVisiter;
    }
}

    const frog = new Visiter('frog',5);
    const butterfly = new Visiter('butterfly',10);
    const snail = new Visiter('snail', 12);

    let visiters = [];
        visiters.push(frog);
        visiters.push(butterfly);
        visiters.push(snail);
   