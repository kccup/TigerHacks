document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('falling-vegetables');
    const heading = document.getElementById('heading');
    const vegetables = ['kelp.png', 'carrots.png', 'corn.png']; // Add your specific vegetable images here

    function createVegetable() {
        const vegetable = document.createElement('img');
        vegetable.src = `images/${vegetables[Math.floor(Math.random() * vegetables.length)]}`;
        vegetable.classList.add('vegetable');
        vegetable.style.left = `${Math.random() * 100}vw`;
        vegetable.style.top = `-50px`; // Start above the viewport
        container.appendChild(vegetable);

        let speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        let direction = 1; // 1 for down, -1 for up

        function animate() {
            const vegRect = vegetable.getBoundingClientRect();
            const headingRect = heading.getBoundingClientRect();

            // Check for collision with the heading
            if (
                vegRect.bottom > headingRect.top &&
                vegRect.top < headingRect.bottom &&
                vegRect.right > headingRect.left &&
                vegRect.left < headingRect.right
            ) {
                direction = -1; // Reverse direction to simulate bounce
            }

            // Move the vegetable
            vegetable.style.top = `${vegRect.top + speed * direction}px`;

            // Remove the vegetable if it goes out of the viewport
            if (vegRect.top > window.innerHeight || vegRect.bottom < 0) {
                vegetable.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    // Create a new vegetable every 500ms
    setInterval(createVegetable, 500);
});
