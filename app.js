const setApp = require('./src')
setApp
  .then((app) =>
    app.listen(3001, () => console.info('app running on port 3001'))
  )
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
