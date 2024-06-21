function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a circle
function createCircle(id, size, top, left) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
    circle.dataset.id = id;
    return circle;
}

// Function to generate random circles
function generateCircles(numCircles) {
    const container = document.getElementById('bubble');
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
        const size = getRandom(30, 300); // Circle size between 20px and 100px
        const top = getRandom(0, window.innerHeight - size);
        const left = getRandom(0, window.innerWidth - size);
        
        const circle = createCircle(i, size, top, left);
        container.appendChild(circle);
        
        // Save circle data
        circles.push({ id: i, size, top, left });
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
            const circle = createCircle(data.id, data.size, data.top, data.left);
            container.appendChild(circle);
        });
    } else {
        // If no circles are saved, generate new ones
        generateCircles(30);
    }
}

// Load circles when the page loads
window.onload = loadCircles;