const ordersDb = require("../repositories/orders");

module.exports = (app) => {
    app.get("/orders", async (req, res, next) => {
        try {
            const orders = await ordersDb.selectOrders()
            if (orders.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum pedido cadastrado' });
            }
            return res.send(orders);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível retornar nenhum pedido' });
        }
    })

    app.get("/orders/:id", async (req, res, next) => {
        try {
            const orders = await ordersDb.selectOrdersById(req.params.id)
            if (orders.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum pedido com o id informado ' })
            }
            return res.status(200).send(orders);
        } catch (error) {
            // return res.status(500).send({ message: error.message })
            return res.status(500).send({ message: 'Não foi possível retornar nenhum pedido ' })
        }
    })

    app.post("/orders", async (req, res, next) => {
        try {
            const orders = await ordersDb.insertOrders(req.body)
            return res.send(orders);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível cadastrar pedido '})
            
        }
    })

    app.put("/orders/:id", async (req, res, next) => {
        try {
            const orders = await ordersDb.updateOrders(req.params.id, req.body)
            return res.send(orders);
        } catch (error) {
            return res.status(500).send({ message: 'Ocorreu um erro interno' })
        }
    })

    app.delete("/orders/:id", async (req, res, next) => {
        try {
            const orders = await ordersDb.deleteOrders(req.params.id)
            if(orders.affectedRows === 0) {
                return res.status(404).send({ message: 'Pedido não encontrado' })
            }
            return res.send({ message: 'Pedido excluído com sucesso' });
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível excluir o pedido' })
        }
    })
}