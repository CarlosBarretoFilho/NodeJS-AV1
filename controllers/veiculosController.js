const veiculos = require('../models/Veiculos')
const Veiculo = require('../models/Veiculos')

module.exports = app => {
    app.get('/veiculos', (req, res) => {
        Veiculo.list(res) 
    })

    app.post('/veiculos', (req, res) => { 
        const veiculo = req.body

        Veiculo.create(veiculo, res)
        
    })

   
    app.patch('/veiculos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Veiculo.update(id, valores, res)
    })

    app.delete('/veiculos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Veiculo.delete(id, res)
    })


}