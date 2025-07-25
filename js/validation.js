export default function validation() {
  const form = document.getElementById("modal")
  form.addEventListener("submit", formSend)

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate()
    if (error === 0) {
      console.log("Форма заполнена успешно")
      return
    } else {
      console.log("Заполните обязательные поля")
    }
  }

  const inputName = document.getElementById("input-name")
  inputName.addEventListener("blur", () => {
    if (!nameTest(inputName)) {
      formAddError(inputName)
    } else {
      formRemoveError(inputName)
    }
  })

  const inputEmail = document.getElementById("input-email")
  inputEmail.addEventListener("blur", () => {
    if (!emailTest(inputEmail)) {
      formAddError(inputEmail)
    } else {
      formRemoveError(inputEmail)
    }
  })

  const inputPhone = document.getElementById("input-phone")
  inputPhone.addEventListener("blur", () => {
    if (!phoneTest(inputPhone)) {
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
      } else if (input.classList.contains("_time")) {
        if (inputTime.value) {
          let hour = +inputTime.value.toString().slice(0, 2)
          let min = +inputTime.value.toString().slice(3, 5)
          if (hour >= 9 && hour <= 18) {
            if (min >= 15 && min <= 44) {
              min = "30"
            } else if (min >= 0 && min <= 14) {
              min = "00"
            } else if (min >= 45 && min <= 59) {
              min = "00"
              hour = hour + 1
            }
            inputTimeTitle.textContent = `${hour}:${min}`
            overviewTimeTitle.textContent = `${hour}:${min}`
          } else {
            formAddError(input)
            inputTimeTitle.textContent = `${hour}:${min}`
            overviewTimeTitle.textContent = `${hour}:${min}`
          }
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
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_active")
  }

  function nameTest(input) {
    return /^([А-Я]{1}[а-яё]{2,14}|[A-Z]{1}[a-z]{2,14})$/.test(input.value)
  }
  function emailTest(input) {
    return /^([0-9A-Za-z]{1}[0-9A-Za-z_\.-]{1,13}[0-9A-Za-z]{1}@[a-z]{4,}\.[a-z]{2,})$/.test(
      input.value
    )
  }
  function phoneTest(input) {
    return /^(\d{3}(\s|-)\d{3}(\s|-)\d{3})|(\d{2}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2})$/.test(
      input.value
    )
  }

  // date

  const inputDateTitle = document.querySelector(".input-date-title")
  const dateTicket = document.querySelector(".overview-date-title")

  const inputDate = document.getElementById("input-date")
  inputDate.addEventListener("change", () => {
    inputDateTitle.textContent = inputDate.value
    getTicketDate()
  })

  const todayObject = new Date()

  function setCurrentDate() {
    const y = todayObject.getFullYear()
    const m = (todayObject.getMonth() + 1).toString().padStart(2, "0")
    const d = todayObject.getDate().toString().padStart(2, "0")
    const today = `${y}-${m}-${d}`
    inputDate.value = today
    inputDate.min = today
  }
  setCurrentDate()

  function getTicketDate() {
    if (inputDate.value) {
      const dateObject = new Date(inputDate.value)
      const week = getDayName(dateObject)
      const month = getMonthName(dateObject)
      const day = dateObject.getDate()
      dateTicket.textContent = `${week}, ${month} ${day}`
    }
  }
  getTicketDate()

  function getDayName(date) {
    const day = new Date(date).getDay()
    switch (day) {
      case 0:
        return "Sunday"

      case 1:
        return "Monday"

      case 2:
        return "Tuesday"

      case 3:
        return "Wednesday"

      case 4:
        return "Thursday"

      case 5:
        return "Friday"

      case 6:
        return "Saturday"

      default:
        return undefined
    }
  }

  function getMonthName(date) {
    const month = new Date(date).getMonth()
    switch (month) {
      case 0:
        return "January"

      case 1:
        return "February"

      case 2:
        return "March"

      case 3:
        return "April"

      case 4:
        return "May"

      case 5:
        return "June"

      case 6:
        return "July"

      case 7:
        return "August"

      case 8:
        return "September"

      case 9:
        return "October"

      case 10:
        return "November"

      case 11:
        return "December"

      default:
        return undefined
    }
  }

  // time

  const inputTime = document.getElementById("input-time")

  const inputTimeTitle = document.querySelector(".input-time-title")
  const overviewTimeTitle = document.querySelector(".overview-time-title")

  inputTime.addEventListener("change", () => {
    if (inputTime.value) {
      let hour = +inputTime.value.toString().slice(0, 2)
      let min = +inputTime.value.toString().slice(3, 5)
      if (hour >= 9 && hour <= 18) {
        if (min >= 15 && min <= 44) {
          min = "30"
        } else if (min >= 0 && min <= 14) {
          min = "00"
        } else if (min >= 45 && min <= 59) {
          min = "00"
          hour = hour + 1
        }
        formRemoveError(inputTime)
        inputTimeTitle.textContent = `${hour}:${min}`
        overviewTimeTitle.textContent = `${hour}:${min}`
      } else {
        formAddError(inputTime)
        inputTimeTitle.textContent = `${hour}:${min}`
        overviewTimeTitle.textContent = `${hour}:${min}`
      }
    }
  })

  function setCurrentTime() {
    const h = todayObject.getHours().toString().padStart(2, "0")
    const m = todayObject.getMinutes().toString().padStart(2, "0")
    overviewTimeTitle.textContent = `${h}:${m}`
    inputTime.value = `${h}:${m}`
  }

  setCurrentTime()

}
