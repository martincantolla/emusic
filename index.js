const express = require("express")
const app = express()

const fs = require('fs')
const cors = require('cors')

app.listen (3000, console.log("servidor encendido"))

app.use(express.json())
app.use(cors())

app.get("/" , (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/canciones" , (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))

    canciones.push(cancion)

    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    
    res.send("Canción agregada con éxito!")
    })


app.delete("/canciones/:id" , (req, res) => {

    const { id } = req.params;
    let canciones = JSON.parse(fs.readFileSync("repertorio.json"))
        
    const parsedId = parseInt(id);
    canciones = canciones.filter(p => p.id !== parsedId)
    
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    
    res.send("Canción eliminada con éxito")
})

app.put("/canciones/:id" , (req, res) => {

    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(p => p.id == id)

    canciones[index] = cancion

    fs.writeFileSync("repertorio.json" , JSON.stringify(canciones))
    res.send("Canción modificada con éxito")
})