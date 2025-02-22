let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
    let gradientColor = context.createLinearGradient(0, 0, 200, 200);
    gradientColor.addColorStop(0, "#c3a3f1");
    gradientColor.addColorStop(1, "#6414e9");
    context.fillStyle = gradientColor;
    context.fillRect(0, 0, 200, 200);
};

let mouseX = 0, mouseY = 0, isDragged = false;

// Events for Mouse and Touch
let events = {
    mouse: { down: "mousedown", move: "mousemove", up: "mouseup" },
    touch: { down: "touchstart", move: "touchmove", up: "touchend" }
};

// Detect Touch Device
let deviceType = "mouse";  // Default

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
    } catch (e) {
        deviceType = "mouse";
    }
};

// Get canvas position
let rect = canvas.getBoundingClientRect();

// Get X, Y Position
const getXY = (event) => {
    if (deviceType === "mouse") {
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    } else {
        mouseX = event.touches[0].clientX - rect.left;
        mouseY = event.touches[0].clientY - rect.top;
    }
};

// Scratch Function
const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 12, 0, 2 * Math.PI);
    context.fill();
};

// Initialize Touch or Mouse Event
isTouchDevice();

canvas.addEventListener(events[deviceType].down, (event) => {
    isDragged = true;
    getXY(event);
    scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].move, (event) => {
    if (!isDragged) return;
    event.preventDefault();
    getXY(event);
    scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].up, () => {
    isDragged = false;
});

canvas.addEventListener("mouseleave", () => {
    isDragged = false;
});

// Run init on window load
window.onload = init;
