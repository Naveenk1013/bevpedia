let currentCategory = 'all';
let currentSearch = '';
let selectedCocktail = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const cocktailButtonsContainer = document.getElementById('cocktailButtons');
const cocktailInfo = document.getElementById('cocktailInfo');

// Event Listeners
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderCocktails();
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        // Update active state
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderCocktails();
    });
});

function renderCocktails() {
    const filteredCocktails = categories[currentCategory].filter(cocktail =>
        cocktail.name.toLowerCase().includes(currentSearch)
    );

    cocktailButtonsContainer.innerHTML = filteredCocktails
        .map(cocktail => `
            <button class="cocktail-button ${selectedCocktail?.name === cocktail.name ? 'active' : ''}"
                    onclick="showCocktailDetails('${cocktail.name}')">
                ${cocktail.name}
            </button>
        `).join('');
}

function showCocktailDetails(cocktailName) {
    selectedCocktail = categories[currentCategory].find(c => c.name === cocktailName);
    
    if (!selectedCocktail) return;

    cocktailInfo.innerHTML = `
        <h2>${selectedCocktail.name}</h2>
        <div class="detail-section">
            <h3>Glass</h3>
            <p>${selectedCocktail.glass}</p>
        </div>
        <div class="detail-section">
            <h3>Mixing Method</h3>
            <p>${selectedCocktail.mixingMethod}</p>
        </div>
        <div class="detail-section">
            <h3>Garnish</h3>
            <p>${selectedCocktail.garnish || 'None'}</p>
        </div>
        <div class="detail-section">
            <h3>Ingredients</h3>
            <p>${selectedCocktail.ingredients}</p>
        </div>
        ${selectedCocktail.note ? `
        <div class="detail-section">
            <h3>Note</h3>
            <p>${selectedCocktail.note}</p>
        </div>
        ` : ''}
    `;

    // Update active state of cocktail buttons
    document.querySelectorAll('.cocktail-button').forEach(button => {
        button.classList.toggle('active', button.textContent.trim() === cocktailName);
    });
}

// Initial render
renderCocktails();