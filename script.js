// Get HTML elements by their IDs
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const goToRecipePageButton = document.getElementById('goToRecipePage');

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
    performSearch();
});

// Add an input event listener to the search input for Enter key functionality
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        performSearch();
    }
});

// Function to perform the search
function performSearch() {
    // Get the user's search input
    const searchTerm = searchInput.value;

    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your Edamam API credentials
    const appId = 'f0274b46';
    const appKey = 'ebccb7e2c7dd3128a44a776e7cff090b';

    // Make an API request to Edamam
    fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('API request failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                displayRecipes(data.hits);
            } else {
                throw new Error('No recipe data found');
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Function to display recipe results
function displayRecipes(recipes) {
    let recipeHTML = '';

    recipes.forEach(recipe => {
        const { label, source, image, url, ingredients } = recipe.recipe;

        recipeHTML += `
            <div class="recipe">
                <h2>${label}</h2>
                <p>Source: ${source}</p>
                <img src="${image}" alt="${label}">
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('')}
                </ul>
                <a href="${url}" target="_blank" rel="noopener noreferrer">View Recipe</a>
            </div>
        `;
    });

    resultsContainer.innerHTML = recipeHTML;
}

// Add a click event listener to the "Make Recipe Using Ingredients" button
goToRecipePageButton.addEventListener('click', () => {
    // Navigate to the new page
    window.location.href = 'make-recipe.html';
});
