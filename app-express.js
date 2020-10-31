const ToyExpress = require('./ToyExpress/express')
const app = new ToyExpress()
const port = 5001

app.use(function (req, res, next) {
    const startTime = Date.now()
    next()
    const endTime = Date.now()
    console.log(`${req.method} ${req.url}: ${endTime-startTime}ms`);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})