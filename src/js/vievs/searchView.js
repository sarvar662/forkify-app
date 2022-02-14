class SearchView {
    _parentEl = document.querySelector(".search")
    
    getQuery() {
        return this._parentEl.querySelector(".search_input").value;
    }

    addSearchHandler(handler) {
        this._parentEl.addEventListener("submit", function(e){
            e.preventDefault()
            handler()
        })
    }

}

export default new SearchView();