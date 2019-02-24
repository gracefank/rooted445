
function update() {
    console.log(Date.now());
}

function draw() {
}


function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
}

// Start things off
requestAnimationFrame(mainLoop);
