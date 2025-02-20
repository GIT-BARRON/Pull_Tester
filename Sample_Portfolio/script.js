// Dynamic gradient interaction with mouse movement
document.addEventListener('mousemove', (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate gradient angle based on mouse position
    const angle = Math.atan2(mouseY - height / 2, mouseX - width / 2) * (180 / Math.PI);
    const xPercent = (mouseX / width) * 100;
    const yPercent = (mouseY / height) * 100;

    // Apply dynamic gradient to the body
    document.body.style.background = `linear-gradient(${angle}deg, #a2cffe, #c2e9fb)`;
});

// Optional: Smooth scroll behavior (can be removed if not needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});