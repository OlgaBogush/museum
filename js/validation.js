export default function validation() {

    const form = document.getElementById("modal")
    form.addEventListener("submit", formSend)

    async function formSend(e) {
      e.preventDefault()

      let error = formValidate()
      if(error === 0) {
        console.log("Форма заполнена успешно");
        return
      } else {
        console.log("Заполните обязательные поля");
      }
    }

    const inputName = document.getElementById("input-name")
    inputName.addEventListener("blur", () => {
      if(!nameTest(inputName)) {
        formAddError(inputName)
      } else {
        formRemoveError(inputName)
      }
    })

    const inputEmail = document.getElementById("input-email")
    inputEmail.addEventListener("blur", () => {
      if(!emailTest(inputEmail)) {
        formAddError(inputEmail)
      } else {
        formRemoveError(inputEmail)
      }
    })

    const inputPhone = document.getElementById("input-phone")
    inputPhone.addEventListener("blur", () => {
      if(!phoneTest(inputPhone)) {
        formAddError(inputPhone)
      } else {
        formRemoveError(inputPhone)
      }
    })


    function formValidate() {
      let counter = 0
      let formRec = document.querySelectorAll("._rec")
      for (let i = 0; i < formRec.length; i++) {
        const input = formRec[i]
        formRemoveError(input)

        if (input.classList.contains("_name")) {
          if (!nameTest(input)) {
            formAddError(input)
            counter++
          }
        } else if (input.classList.contains("_email")) {
          if (!emailTest(input)) {
            formAddError(input)
            counter++
          }
        } else if (input.classList.contains("_phone")) {
          if (!phoneTest(input)) {
            formAddError(input)
            counter++
          }
        } else {
          if (input.value === "") {
            formAddError(input)
            counter++
          }
        }
      }
      return counter
    }


    function formAddError(input) {
      input.parentElement.classList.add("_active")
      input.classList.add("_error")
    }

    function formRemoveError(input) {
      input.parentElement.classList.remove("_active")
      input.classList.remove("_error")

    }

    function nameTest(input) {
      return /^([А-Я]{1}[а-яё]{2,14}|[A-Z]{1}[a-z]{2,14})$/.test(input.value)
    }
    function emailTest(input) {
      return /^([0-9A-Za-z]{1}[0-9A-Za-z_\.-]{1,13}[0-9A-Za-z]{1}@[a-z]{4,}\.[a-z]{2,})$/.test(input.value)
    }
    function phoneTest(input) {
      return /^(\d{3}(\s|-)\d{3}(\s|-)\d{3})|(\d{2}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2})$/.test(input.value)
    }


}
