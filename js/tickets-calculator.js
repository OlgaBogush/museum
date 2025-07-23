export default function getTickets() {
  const radioButtons = document.querySelectorAll(".radio")
  const totalElement = document.querySelector(".total-euro")
  const amountBasicElement = document.querySelector(".tickets-basic-container")
  const amountSeniorElement = document.querySelector(
    ".tickets-senior-container"
  )
  const inputBasic = amountBasicElement.querySelector("input")
  const inputSenior = amountSeniorElement.querySelector("input")

  // overview
  const divBasicQuantity = document.querySelector(".basic-quantity-all")
  const divSeniorQuantity = document.querySelector(".senior-quantity-all")
  const overviewBasicCurrentPrice = document.querySelector(".basic-title-all")
  const overviewSeniorCurrentPrice = document.querySelector(".senior-title-all")
  const basicPriceAll = document.querySelector(".basic-price-all")
  const seniorPriceAll = document.querySelector(".senior-price-all")
  const overviewTotalAll = document.querySelector(".overview-total-all")
  const overviewTypeTitle = document.querySelector(".overview-type-title")
  // left
  const labelTicketBas = document.querySelector(".label-ticket-bas")
  const labelTicketSen = document.querySelector(".label-ticket-sen")
  const amountBas = document.querySelector(".entry-ticket-input-bas")
  const amountSen = document.querySelector(".entry-ticket-input-sen")
  const inputBas = amountBas.querySelector("input")
  const inputSen = amountSen.querySelector("input")
  const select = document.querySelector("#input-ticket-type")

  let currentPrice = 20
  let currentType = "Permanent exhibition"
  let totalPrice = 0

  function getCurrentPrice() {
    radioButtons.forEach((item, index) => {
      if (item.checked) {
        currentPrice = item.dataset.price
        select[index + 1].selected = true
      }
      return currentPrice
    })
  }

  function getCurrentType() {
    radioButtons.forEach((item) => {
      if (item.checked) {
        currentType = item.dataset.type
      }
      return currentType
    })
  }

  radioButtons.forEach((item) => {
    item.addEventListener("click", () => {
      getCurrentPrice()
      getCurrentType()
      getTotalPrice()
    })
  })

  select.addEventListener("change", () => {
    for (let i = 1; i < select.length; i++) {
      if (select[i].selected) {
        currentPrice = select[i].value
        currentType = select[i].textContent
        radioButtons[i - 1].checked = true
        getTotalPrice()
      }
    }
  })

  function getTotalPrice() {
    const totalBasicPrice = inputBasic.value * currentPrice
    const totalSeniorPrice = (inputSenior.value * currentPrice) / 2
    totalPrice = totalBasicPrice + totalSeniorPrice
    totalElement.textContent = `€${totalPrice}`

    divBasicQuantity.textContent = inputBasic.value
    divSeniorQuantity.textContent = inputSenior.value
    overviewBasicCurrentPrice.textContent = `Basic (${currentPrice}€)`
    overviewSeniorCurrentPrice.textContent = `Senior (${currentPrice / 2}€)`
    basicPriceAll.textContent = `${totalBasicPrice} €`
    seniorPriceAll.textContent = `${totalSeniorPrice} €`
    overviewTotalAll.textContent = `${totalPrice} €`
    overviewTypeTitle.textContent = currentType
    // left
    labelTicketBas.textContent = `Basic 18+ (${currentPrice} €)`
    labelTicketSen.textContent = `Senior 65+ (${currentPrice / 2} €)`
  }

  getTotalPrice()

  amountBasicElement.addEventListener("click", () => {
    inputBas.value = inputBasic.value
    getTotalPrice()
  })
  amountSeniorElement.addEventListener("click", () => {
    inputSen.value = inputSenior.value
    getTotalPrice()
  })

  amountBas.addEventListener("click", () => {
    inputBasic.value = inputBas.value
    getTotalPrice()
  })
  amountSen.addEventListener("click", () => {
    inputSenior.value = inputSen.value
    getTotalPrice()
  })
}
