// const { deleteClients } = require("../repositories/clients");
const productsDb = require("../repositories/products");

module.exports = (app) => {
    app.get("/products", async (req, res, next) => {
        try {
            const products = await productsDb.selectProducts()
            if (products.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum produto cadastrado' })
            }
            return res.send(products);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível retornar nenhum produto' })
        }
    })

    app.get("/products/:id", async (req, res, next) => {
        try {
            const products = await productsDb.selectProductsById(req.params.id)
            if (products.length === 0) {
                return res.status(404).send({ message: 'Não existe nenhum produto com o id informado' });
            }
            return res.status(200).send(products);
        } catch (error) {
            return res.status(500).send({ message: 'Não foi possível retornar nenhum produto' });
        }
    })

    app.post("/products", async (req, res, next) => {
        try {
            const products = await productsDb.insertProducts(req.body)
            return res.send(products);
        } catch (error) {
            return res.status(500).send({ message: 'Ocorreu um erro interno' })
        }
    })

    app.put("/products/:id", async (req, res, next) => {
        try {
            const products = await productsDb.updateProducts(req.params.id, req.body)
            return res.send(products);
        } catch (error) {
            return res.status(500).send({ message: 'Ocorreu um erro interno' })            
        }
    })

    app.delete("/products/:id", async (req, res, next) => {
        try {
            const products = await productsDb.deleteProducts(req.params.id)
            if(products.affectedRows === 0) {
                return res.status(404).send({ message: 'Produto não encontrado' })
            }
            return res.send({ message: 'Produto exluído com sucesso' });
        }
        catch(error) {
            return res.status(500).send({ message: 'Ocorreu um erro interno' })
        }
    })
}
