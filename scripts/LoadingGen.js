document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('loading');
    const numberOfDots = 20; 
    const animationDelay = 0.4; 

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.animationDelay = `${i * animationDelay}s`;
        container.appendChild(dot);
    }
});