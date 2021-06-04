const connect = require("./mysql");

async function selectClients(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM client;');
    return rows;
}

async function selectClientsById(id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM client WHERE id=?;', id);
    return rows;
}

async function insertClients(client) {
    const conn = await connect();
    const [rows] = await conn.query('INSERT INTO client(name, email) VALUES (?, ?)',[client.name, client.email]);
    return rows;
}

async function updateClients(id, client) {
    const conn = await connect();
    const [rows] = await conn.query('UPDATE client SET ? WHERE id = ?;', [client, id]);
    return rows;
}

async function deleteClients(id) {
    const conn = await connect();
    const [rows] = await conn.query('DELETE FROM client WHERE ID = ?;', id);
    return rows;
}


module.exports = {selectClients, selectClientsById, insertClients, updateClients, deleteClients}
