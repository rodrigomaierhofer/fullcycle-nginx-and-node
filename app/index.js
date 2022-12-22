const express = require('express')
const { faker } = require('@faker-js/faker')
const mySqlClient = require('./my-sql-client')

const app = express()
const port = process.env.PORT

mySqlClient.connect()

app.get('/',async (req, res) => {
  await mySqlClient.connection.execute(`INSERT INTO people(name) VALUES (?)`, [faker.name.firstName()])
  const [people] = await mySqlClient.connection.query(`SELECT name FROM people`)
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    ${people.map(person => {
      return `<li>${person.name}</li>`
    }).join('')}
  `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})