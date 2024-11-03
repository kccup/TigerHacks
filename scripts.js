document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const mealSearch = document.getElementById('mealSearch');
    const itemsContainer = document.getElementById('items');
    const msg = document.getElementById('msg');

    searchButton.addEventListener('click', function() {
        const query = mealSearch.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });

    function fetchRecipes(query) {
        const apiUrl = https://api.api-ninjas.com/v1/recipe?query=${query};

        fetch(apiUrl, {
            headers: {
                'X-Api-Key': '1epqI0NA2HdDQWAra/4JLA==62DNt8CYULG0YCYc', // Your API key
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRecipes(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    function displayRecipes(recipes) {
        itemsContainer.innerHTML = ''; // Clear previous results
        msg.style.display = recipes.length ? 'none' : 'block'; // Show message if no recipes

        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = 
                <h4>${recipe.title}</h4>
                <p>${recipe.instructions}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            ;
            itemsContainer.appendChild(recipeDiv);
        });
    }
});







