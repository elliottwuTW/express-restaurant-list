const input = document.querySelector('#input')
const form = document.querySelector('form')
const error = document.querySelector('small')

input.addEventListener('focus', event => {
  error.classList.remove('show')
})

form.addEventListener('submit', event => {
  if (!input.value.trim()) {
    error.classList.add('show')
    event.preventDefault()
  }
})
