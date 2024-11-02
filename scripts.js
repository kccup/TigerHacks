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

document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value 
    let details = document.getElementById("details")
    details.innerHTML = ""
    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data=> {
            const items = document.getElementById("items")
            items.innerHTML = ""
            if(data.meals == null){
                document.getElementById("msg").style.display = "block"
            }else{
                document.getElementById("msg").style.display = "none"
                data.meals.forEach(meal =>{
                    itemDiv = document.createElement("div")
                    itemDiv.className = "m-2 singleItem"
                    itemDiv.setAttribute('onclick' , `details('${meal.idMeal}')`)
                    let  itemInfo = `
                    <div class="card " style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `
                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)
                })
            }

        })
})

function details(id){
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(detail => {
        let meal = detail.meals[0]
        console.log(meal)
        let details = document.getElementById("details")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")
        let detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3 class="card-text">${meal.strMeal}</h3>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strArea}</li>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const mealSearch = document.getElementById('mealSearch').value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearch}`);
    const data = await response.json();
    
    displayMeals(data.meals);
});

function displayMeals(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = ''; // Clear previous results
    
    if (!meals) {
        mealResults.innerHTML = '<p>No meals found. Please try again.</p>';
        return;
    }

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-item mb-3';
        mealDiv.innerHTML = `
            <h5>${meal.strMeal}</h5>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
            <p>Category: ${meal.strCategory}</p>
            <p>Area: ${meal.strArea}</p>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-info">Watch Recipe</a>
        `;
        mealResults.appendChild(mealDiv);
    });
}

