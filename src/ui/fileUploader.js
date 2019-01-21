// @ts-nocheck

const REQUEST_URL = "http://localhost:3000"
const OK = 200

document
    .querySelector('#file-chooser')
    .addEventListener("change", function (evt) {

        if (!evt.target.files.length) {
            return
        }

        const xhr = new XMLHttpRequest()
        xhr.open("POST", REQUEST_URL)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        xhr.addEventListener("load", () => {                
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === OK) {
                    new EmployeesGrid(
                        JSON.parse(xhr.response).employees
                    )
                }
            }
        })
        xhr.send(evt.target.files[0])
})