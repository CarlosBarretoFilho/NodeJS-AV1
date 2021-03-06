const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Veiculo {


    create(veiculo, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(veiculo.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)

        const veiculoValido = veiculo.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },

            {
                nome: 'veiculo',
                valido: veiculoValido,
                mensagem: 'Veiculo deve ter pelo menos cinco caracteres '
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido )
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const veiculoDatado = {...veiculo, dataCriacao, data}

        
        const sql = 'INSERT INTO Veiculos SET ?'
    
        conexao.query(sql, veiculoDatado, (erro, veiculo) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(veiculo)
            }
        })

        }

        
    
    }

    list(res) {
        const sql = 'SELECT * FROM Veiculos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }


    update(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Veiculos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (error, resultados) => {
            if(error) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM Veiculos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Veiculo