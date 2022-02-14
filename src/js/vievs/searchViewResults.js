class SearchViewResults {
    _asideBar = document.querySelector(".side-1")

    render(data) {
        this._asideBar.innerHTML = "";
        data.forEach(element => {
        this._generateMarkup(element)
        });
    }
    _generateMarkup(recipes) {
            let asideMarkup = `
            <a class="aside-links" href="#${recipes.id}">
            <img src="${recipes.image_url}" alt="">
            <div>
            <h3>${recipes.title.substring(0, 15)}...</h3>
            <h4>${recipes.publisher}</h4>
            </div>
            </a>
            `
            this._asideBar.insertAdjacentHTML("afterbegin", asideMarkup)
    }
} 

export default new SearchViewResults();