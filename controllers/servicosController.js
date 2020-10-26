const servicos = require('../models/Servicos')
const Servicos = require('../models/Servicos')

module.exports = app => {
    app.get('/servicos', (req, res) => {
        Servicos.list(res) 
    })

    app.post('/servicos', (req, res) => { 
        const servicos = req.body

        Servicos.create(servicos, res)
        
    })

    app.get('/servicos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Servicos.buscaPorId(id, res)
        
    })

    app.patch('/servicos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Servicos.update(id, valores, res)
    })

    app.delete('/servicos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Servicos.delete(id, res)
    })


}