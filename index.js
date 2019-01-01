const express = require('express')
const projectRoutes = require('./projects/projectRoutes')
const actionRoutes = require('./actions/actionRoutes')
const mwConfig = require('./data/mwConfig')

const PORT = 5000
const server = express()

mwConfig(server)

server.use('/api/projects', projectRoutes)
server.use('/api/actions', actionRoutes)

server.listen(PORT, () => console.log(`API running on port ${PORT}`))
