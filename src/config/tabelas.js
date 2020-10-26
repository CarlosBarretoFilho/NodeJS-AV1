const { text } = require("body-parser")

class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarServicos()
        this.criarUsuarios()
        this.criarVeiculos()
        
    }

    criarServicos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Servicos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, veiculo varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Servicos criada com sucesso')
            }
        })

    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, usuario varchar(50) NOT NULL, role varchar(20), data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso')
            }
        })

    }

    criarPet() {
        const sql = 'CREATE TABLE IF NOT EXISTS Veiculos (id int NOT NULL AUTO_INCREMENT, veiculo varchar(50) NOT NULL,  data datetime NOT NULL, dataCriacao datetime NOT NULL, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Veiculos criada com sucesso')
            }
        })

    }



}

module.exports = new Tabelas