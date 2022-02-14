class AddRecipe {
    formContainer = document.querySelector(".form-container")
    showBtn = document.querySelector(".add-btn")
    exitBtn = document.querySelector(".exit-btn")
    form = document.querySelector(".form")
    constructor(){
        this.showBtn.addEventListener("click", this.openModal.bind(this))
        this.exitBtn.addEventListener("click", this.closeModal.bind(this))
    }

    openModal() {
        this.formContainer.classList.remove("form-hidden");
    }

    closeModal() {
        this.formContainer.classList.add("form-hidden")
    }

    addHandlerSubmit(handler) {
        this.form.addEventListener("submit", function(e) {
            e.preventDefault()
            let dataArr = [...new FormData(this)]
            let data = Object.fromEntries(dataArr)
            handler(data)
        })
    }

}

export default new AddRecipe()