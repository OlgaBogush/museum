export default function getTickets() {
  const radioButtons = document.querySelectorAll(".radio")
  const totalElement = document.querySelector(".total-euro")
  const amountBasicElement = document.querySelector(".tickets-basic-container")
  const amountSeniorElement = document.querySelector(
    ".tickets-senior-container"
  )
  const inputBasic = amountBasicElement.querySelector("input")
  const inputSenior = amountSeniorElement.querySelector("input")

  let currentPrice = 20
  let totalPrice = 0

  function getTotalPrice() {
    const totalBasicPrice = inputBasic.value * currentPrice
    const totalSeniorPrice = (inputSenior.value * currentPrice) / 2
    totalPrice = totalBasicPrice + totalSeniorPrice
    totalElement.textContent = `€${totalPrice}`
  }

  getTotalPrice()

  amountBasicElement.addEventListener("click", getTotalPrice)
  amountSeniorElement.addEventListener("click", getTotalPrice)

  function getCurrentPrice() {
    radioButtons.forEach((item) => {
      if (item.checked) {
        currentPrice = item.dataset.price
      }
      return currentPrice
    })
  }

  radioButtons.forEach((item) => {
    item.addEventListener("click", () => {
      getCurrentPrice()
      getTotalPrice()
    })
  })
}
