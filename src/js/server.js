import "core-js/stable";
import * as module from "./module.js";
import PaginationView from "./vievs/paginationView.js";
import recipeView from "./vievs/renderRecipe.js";
import SearchView from "./vievs/searchView.js";
import SearchViewResults from "./vievs/searchViewResults.js";
import BookmarkShow from "./vievs/bookmarkShow.js";
import AddNewRecipe from "./vievs/addRecipe.js";


let getRecipe = async function() {
    try {
        let id = window.location.hash.slice(1) || "5ed6604591c37cdc054bcd09"
        await module.loadRecipe(id)
        recipeView.render(module.state.recipe)
    } catch (err) {
        console.log(err);
    }

}


let events = ["hashchange", "load"]
events.forEach(ev => window.addEventListener(ev, getRecipe))


const renderSearchResults = async function() {
    let query = SearchView.getQuery();
    await module.loadSearchResults(query) 
    SearchViewResults.render(module.paginationLoad());
    PaginationView.render(module.state.search)
}
SearchView.addSearchHandler(renderSearchResults);


const paginationUpdate = function(page) {
    SearchViewResults.render(module.paginationLoad(Number(page)));
    PaginationView.render(module.state.search)
}
PaginationView.changePage(paginationUpdate);


const controlServings = function(newServings) {
    module.updateServings(newServings)
    recipeView.render(module.state.recipe)
}
recipeView.addEventHandlerServings(controlServings)


const controlBookmark = function() {

    if(module.state.recipe.bookmarked) {
        module.deleteBookmarks(module.state.recipe.id)
    }else{
        module.addToBookmarks(module.state.recipe)
    }

    recipeView.render(module.state.recipe)
    BookmarkShow.render(module.state.bookmarks)
}
recipeView.addEventHandlerBookmark(controlBookmark)


const controlRenderBookmark = async function() {
    await module.loadBookmark();
    BookmarkShow.render(module.state.bookmarks)
    console.log(module.state.bookmarks);
}
BookmarkShow.addEventHandlerBtn(controlRenderBookmark)


let addNewRecipe = async function(data) {
    await module.createRecipe(data)
    recipeView.render(module.state.recipe)
    window.history.pushState(null, '', `#${module.state.recipe.id}`)
}

AddNewRecipe.addHandlerSubmit(addNewRecipe)