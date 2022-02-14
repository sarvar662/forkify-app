class PaginationView {
    _parentEl = document.querySelector(".btn-container")

    render(data) {
        this._parentEl.innerHTML = ""
        this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data))
    }

    changePage(handler) {
        this._parentEl.addEventListener("click", function(e) {
            let btn = e.target.closest(".btn-pagination")
            if(!btn) return;
            let page = btn.getAttribute("data-page")
            console.log(page);
            handler(page)
        })
    }

    _generateMarkup(data) {
        let pageNum =  Math.ceil(data.results.length / data.resultPerPage)
        if(data.page === 1 && pageNum > 1) {
            return `<button class = "btn-pagination next" data-page ="${data.page+1}"> Page ${data.page + 1 }> </button>`
        }
        if(data.page > 1 && data.page < pageNum) {
            return `
                <button class = "btn-pagination prev" data-page ="${data.page-1}"> Page${data.page - 1} </button>
                <button class = "btn-pagination next" data-page ="${data.page+1}"> Page ${data.page + 1 } </button>
                `
        }

        if(data.page === pageNum && pageNum > 1) {
            return `
                <button class = "btn-pagination prev" data-page ="${data.page-1}">Page${data.page - 1}</button>
            `
        }
        return '';
    }
    
}

export default new PaginationView()