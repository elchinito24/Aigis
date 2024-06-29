// Importar dependencias
const connection = require('./database/connection.js')
const express = require('express')
const cors = require('cors')

// Conexion a BD
connection()

// Crear servidor node
const app = express()
const port = 3000

// Configurar cors
app.use(cors())

// Convertir los datos del body a JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Cargar conf rutas
const UsuarioRoutes = require('./routes/usuario.js')

app.use('/usuario', UsuarioRoutes)

// Poner servidor a escuchar paticiones http
app.listen(port,() => {
    console.log(`Servidor iniciando en el ${port}`)
})