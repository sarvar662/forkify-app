export const state = {
    recipe: {},
    search:{
        query:"",
        results:[],
        page:1,
        resultPerPage : 10,
    },
    bookmarks:[]
}

const createRecipeObject = function(data) {
    let {recipe} = data.data;
    return {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
        ...(recipe.key&&{key:recipe.key})
    }
}

export const loadRecipe = async(id) => {
    try {
    let res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/` + id)
    let data = await res.json()
    if (!data) throw Error(`${data.message} ${res.status}`)

    state.recipe = createRecipeObject(data);
        
    if(state.bookmarks.some(bookmark=> bookmark.id == id)) state.recipe.bookmarked = true
    else state.recipe.bookmarked = false
    } catch(err) {
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try{
        if(!query) return;
        state.search.query = query;
        let res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
        let { data } = await res.json()
        if (!data) throw Error(`${data.message} ${res.status}`)
        state.search.results = data.recipes;
    } catch(err) {
        console.log(err);
    }
}


export const paginationLoad = function(page = state.search.page) {
    state.search.page = page
    let start = (page - 1) * 10;
    let end = start + state.search.resultPerPage;                                        
    return state.search.results.slice(start, end)
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(element => {
        element.quantity = element.quantity / state.recipe.servings * newServings       
    });
    state.recipe.servings = newServings;
}

export const saveBookmarks = function() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks))
}

export const addToBookmarks = function(recipe) {
    state.bookmarks.push(recipe)
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    saveBookmarks()
}

export const deleteBookmarks = function(recipe) {
    let index =  state.bookmarks.findIndex(el => {el.id === recipe.id});
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    saveBookmarks()
}

export const loadBookmark = async function(){
    if(localStorage.length === 0) return;
    let data = await JSON.parse(localStorage.getItem("bookmarks"))
    state.bookmarks = data;
}

export const createRecipe = async function(newRecipe) {
    try {
        // console.log(newRecipe);
        let ingredientsArr = Object.entries(newRecipe).filter(ing => ing[0].startsWith("ingredient"))

        let ingredients = ingredientsArr.map(val => {
            let [quantity, unit, description] = val[1].split(",");
            return {quantity:quantity ? quantity : null, unit, description};
        })
                
        let recipe = {
            cooking_time: +newRecipe.cookingTime,
            image_url: newRecipe.imageUrl,
            ingredients: ingredients,
            publisher: newRecipe.publisher,
            servings: +newRecipe.servings,
            source_url: newRecipe.URL,
            title: newRecipe.title
        }
        

        let response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes?key=127dc395-3535-40fd-a6e1-a4368d7ff888", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let data = await response.json();
        state.recipe = createRecipeObject(data)
        addToBookmarks(state.recipe)
    } catch(err) {
        throw err;
    }
}