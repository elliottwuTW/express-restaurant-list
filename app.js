// Include the modules and files needed in Node.js
const express = require('express')
const exphdbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Create the Express app
const app = express()
const port = 3000

// Set the template engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))// main.handlebars is the Layout
app.set('view engine', 'handlebars')

// Set the static files routing
app.use(express.static('public'))

// Set the main page routing
app.get('/', (req, res) => {
  res.render('index', { restaurantInfo: restaurantList.results })
})

// Set the restaurant page routing
app.get('/restaurants/:id', (req, res) => {
  const targetRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: targetRestaurant })
})

// Set the restaurant-search routing
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const matchRestaurant = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || (restaurant.category.includes(keyword))
  })

  res.render('index', { restaurantInfo: matchRestaurant, keyword })
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}.`)
})
