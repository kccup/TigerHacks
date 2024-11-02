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
    const vegetables = ['kelp.png', 'carrots.png', 'corn.png']; // Add your specific vegetable images here

    function createVegetable() {
        const vegetable = document.createElement('img');
        vegetable.src = `images/${vegetables[Math.floor(Math.random() * vegetables.length)]}`;
        vegetable.classList.add('vegetable');
        vegetable.style.left = `${Math.random() * 100}vw`;
        vegetable.style.animationDuration = `${Math.random() * 9 + 7}s`; // Random duration between 5 and 10 seconds
        container.appendChild(vegetable);

        // Remove the vegetable after the animation ends
        vegetable.addEventListener('animationend', () => {
            vegetable.remove();
        });
    }

    // Create a new vegetable every ___ms
    setInterval(createVegetable, 1000);
});