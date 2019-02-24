var lastFrameTimeMs = Date.now(); // The last time the loop was run
var maxFPS = 1; // The maximum FPS we want to allow
var timestamp = 0;

function update() {
    console.log(Date.now());
}

function draw() {
}


function mainLoop() {
    timestamp = Date.now();
    if(timestamp < lastFrameTimeMs + (1000/maxFPS)){
        requestAnimationFrame(mainLoop);
        return;
    }

    update();
    draw();
    lastFrameTimeMs = timestamp;
    requestAnimationFrame(mainLoop);
}

// Start things off
requestAnimationFrame(mainLoop);
