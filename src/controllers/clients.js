const clientsDb = require("../repositories/clients");

module.exports = (app) => {
    app.get("/clients", async (req, res, next) => {
        try {
            const clients = await clientsDb.selectClients()
            if (clients.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum cliente cadastrado' });
            }
            return res.send(clients);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível retornar nenhum cliente' });
        }
    })

    app.get("/clients/:id", async (req, res, next) => {
        try {
            const clients = await clientsDb.selectClientsById(req.params.id)
            if(clients.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum cliente com o id informado' });
            }
            return res.status(200).send(clients);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível retornar nenhum cliente' });
        }
    })

    app.post("/clients", async (req, res, next) => {
        try {
            const clients = await clientsDb.insertClients(req.body)
            return res.send(clients);

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ message: 'Usuário já cadastrado' })
            }
            return res.status(500).send({ message: 'Não foi possível cadastrar cliente' });
        }
    })

    app.put("/clients/:id", async (req, res, next) => {
        try {
            const clients = await clientsDb.updateClients(req.params.id, req.body)
            return res.send(clients);

        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ message: 'Usuário já cadastrado'})
            }
            return res.status(500).send({ message: 'Ocorreu um erro interno' })
        }
    })

    app.delete("/clients/:id", async (req, res, next) => {
        try {
            const clients = await clientsDb.deleteClients(req.params.id)
            if (clients.affectedRows === 0) {
                return res.status(404).send({ message: 'Usuário não encontrado' })
            }
            return res.send({ message: 'Usuário excluído com sucesso' });
        }
        catch(error) {
            return res.status(500).send({ message: 'Não foi possível excluir cliente' })
        }
    })
}
