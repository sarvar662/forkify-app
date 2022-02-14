class RecipeView {
    _parentEl = document.querySelector('.main-info');
    render(data) {
        this._generateMarkup(data)
    }

    addEventHandlerServings(handler) {
        this._parentEl.addEventListener("click", function(e) {
            let btn = e.target.closest(".plus-minus")
            if(!btn) return;
            let newServings = Number(btn.getAttribute("data-servings"))
            if(newServings > 0) handler(newServings);
        })
    }

    addEventHandlerBookmark(handler) {
        this._parentEl.addEventListener("click", function(e){
            let btn = e.target.closest(".bookmark");
            if(!btn) return;
            handler()
        })
    }

    _generateMarkup(recipe) {
            let markup = `
        <div class="main-img-title">
            <img class="recipe-img" src="${recipe.imageUrl}" alt="">
            <h1 class="recipe-title">
            <span>${recipe.title}</span>
            </h1>
        </div>
        <div class="main-serving">
            <span class="minute">${recipe.cookingTime} minutes</span>
            <span>
                <span class="servings">${recipe.servings} servings</span>
                <button data-servings = "${recipe.servings + 1}" class="plus-minus">+</button>
                <button data-servings = "${recipe.servings - 1}" class="plus-minus">-</button>
            </span>
            <button class="bookmark ${recipe.bookmarked ? "bookmarked" : ""}">Bookmark</button>
        </div>
        <div class="ingredients">
            <h2>Ingredients</h2>
            <ul class="list-group list-unstyled">
            ${recipe.ingredients.map(ing=>{
               return` 
               <li class="ingredient">
                <span>${ing.quantity}</span>
                <span>${ing.unit}</span>
                <span>${ing.description}</span>
               </li>
               `
            }).join('')}
        </ul>
        </div>
        <footer>
            <h1>How to cook it</h1>
            <p>This is made by ${recipe.publisher}</p>
            <a href='${recipe.sourceUrl}' class="directions">Directions</a>
        </footer>
        `
        this._parentEl.innerHTML = ''
        this._parentEl.insertAdjacentHTML('afterbegin', markup)
    }
}

export default new RecipeView()