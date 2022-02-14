class BookmarkShow {
    _parentEl = document.querySelector(".bookmark-modal")
    _btnShow = document.querySelector(".bookmark-show-btn")

    render(data) {
        this._parentEl.innerHTML = ""
        if(data.length === 0) return this._parentEl.insertAdjacentHTML("afterbegin", `<h2>No bookmarks yet. Find a nice recipe and bookmark it.</h2>`);
        data.forEach(element => {
            this._generateMarkup(element);
        });
    }

    addEventHandlerBtn(handler) {
            handler()
    }

    _generateMarkup(bookmark) {
        let markup = `
            <a class="bookmark-link" href="#${bookmark.id}">
            <img src="${bookmark.imageUrl}" alt="">
            <div>
                <h3>${bookmark.title.substring(0,10)}...</h3>
                <h5>${bookmark.publisher}</h5>
            </div>
            </a>
        `

        this._parentEl.insertAdjacentHTML("afterbegin", markup)
    }
}

export default new BookmarkShow()