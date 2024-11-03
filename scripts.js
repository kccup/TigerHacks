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
    const vegetables = ['kelp.png', 'carrots.png', 'corn.png']; // Add specific vegetable images here

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

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('mealSearch').value;
    
    // Check if the query is not empty
    if (!query) {
        alert('Please enter a meal to search for.');
        return;
    }

    // Fetch data from the backend
    const response = await fetch(`http://localhost:3000/api/search?query=${query}`);
    const data = await response.json();
    
    // Display results
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = ''; // Clear previous results

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal', 'border', 'rounded', 'p-3', 'mb-3'); // Add Bootstrap classes for styling

            mealElement.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" target="_blank" class="btn btn-success">Watch on YouTube</a>
            `;
            mealResults.appendChild(mealElement);
        });
    } else {
        mealResults.innerHTML = '<p>No results found. Try another search term.</p>';
    }
});






