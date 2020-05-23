const express = require('express')
const app = express()
const user = require('./routes/user')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// const logger = function(req, res, next) {
//   console.log(req.url)
//   next()
// }

// app.use(logger)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/', express.static('public'))

//먼저 작성되는게 우선권을 가짐. 즉 static보다 get메소드가 위에 작성되어 있으면 그걸 보여줌
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.use('/user', user)

app.listen(3000, function() {
  console.log('example express is listening on port 3000')
})
