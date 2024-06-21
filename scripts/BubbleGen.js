// Function to generate a random number between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a circle
function createCircle(id, size, top, left, imgSrc) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
    circle.style.backgroundImage = `url(${imgSrc})`;
    circle.style.backgroundSize = 'cover';
    circle.dataset.id = id;
    return circle;
}

// Function to draw a circle on a canvas and return the data URL
function drawCircleOnCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Set global composite operation to lighter for additive blending
    ctx.globalCompositeOperation = 'lighter';
    
    // Draw the circle
    ctx.fillStyle = 'rgba(74, 66, 189, 0.5)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL();
}

// Function to generate random circles
function generateCircles(numCircles) {
    const container = document.getElementById('bubble');
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
        const size = getRandom(30, 300); // Circle size between 30px and 300px
        const top = getRandom(0, window.innerHeight - size);
        const left = getRandom(0, window.innerWidth - size);
        const imgSrc = drawCircleOnCanvas(size);

        const circle = createCircle(i, size, top, left, imgSrc);
        container.appendChild(circle);
        
        // Save circle data
        circles.push({ id: i, size, top, left, imgSrc });
    }

    // Save circles to localStorage
    localStorage.setItem('circles', JSON.stringify(circles));
}

// Function to load circles from localStorage
function loadCircles() {
    localStorage.removeItem('circles');
    const container = document.getElementById('bubble');
    const circlesData = JSON.parse(localStorage.getItem('circles'));

    if (circlesData) {
        circlesData.forEach(data => {
            const circle = createCircle(data.id, data.size, data.top, data.left, data.imgSrc);
            container.appendChild(circle);
        });
    } else {
        // If no circles are saved, generate new ones
        generateCircles(30);
    }
}

// Load circles when the page loads
window.onload = loadCircles;