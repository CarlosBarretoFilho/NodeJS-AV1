const Usuario = require('../models/usuarios')

module.exports = app => {
    app.get('/usuarios', (req, res) => {
        Usuario.list(res) 
    })

    app.post('/usuarios', (req, res) => { 
        const usuario = req.body

        Usuario.create(usuario, res)
        
    })

   
    app.patch('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Usuario.update(id, valores, res)
    })

    app.delete('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Usuario.delete(id, res)
    })


}