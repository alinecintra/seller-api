const connect = require("./mysql");

async function selectOrders(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM `order`;');
    return rows;
}

async function selectOrdersById(id) {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM `order` WHERE id = ?;', id)
    return rows;
}

async function insertOrders(order) {
    const conn = await connect();
    const [rows] = await conn.query('INSERT INTO `order` (value, client_id) VALUES (?,?)', [order.value, order.client_id]);
    return rows;
}

async function updateOrders(id, order) {
    const conn = await connect();
    const [rows] = await conn.query('UPDATE `order` SET ? WHERE ID = ?;', [order, id]);
    return rows;
}

async function deleteOrders(id) {
    const conn = await connect();
    const [rows] = await conn.query('DELETE FROM `order` WHERE id = ?;', id);
    return rows;
}


module.exports = { selectOrders, selectOrdersById, insertOrders, updateOrders, deleteOrders}
