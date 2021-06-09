const products = require("../controllers/products");
const connect = require("./mysql");

async function selectProducts() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM product;');
    return rows;
}   

async function selectProductsById(id) {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM product WHERE id = ?;', id);
    return rows;
}

async function insertProducts(product) {
    const conn = await connect();
    const [rows] = await conn.query('INSERT INTO product (title, price, stock) VALUES (?,?,?) ', [product.title, product.price, product.stock]);
    return rows;
}

async function updateProducts(id, product) {
    const conn = await connect();
    const [rows] = await conn.query('UPDATE product SET ? WHERE id = ?;', [product, id]);
    return rows;
}

async function deleteProducts(id) {
    const conn = await connect();
    const [rows] = await conn.query('DELETE FROM product WHERE id = ?;', id)
    return rows;
}

module.exports = {selectProducts, selectProductsById, insertProducts, updateProducts, deleteProducts}