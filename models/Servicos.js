const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Servicos {


    create(servicos, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(servicos.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)

        const clienteValido = servicos.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },

            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres '
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido )
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const servicoDatado = {...servicos, dataCriacao, data}

        
        const sql = 'INSERT INTO Servicos SET ?'
    
        conexao.query(sql, servicoDatado, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(servicos)
            }
        })

        }

        
    
    }

    list(res) {
        const sql = 'SELECT * FROM Servicos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Servicos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const servico = resultados [0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(servico)
            }
        })
    }

    update(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Servicos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (error, resultados) => {
            if(error) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM Servicos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Servico