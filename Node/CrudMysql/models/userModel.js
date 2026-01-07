const db = require('../config/db');
const bcrypt = require('bcrypt');

async function getUser(){
    const [user] = await db.query("select username, email from users");
    return user;
}

async function createUser(data) {
    const {username, email, password} = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(`INSERT INTO users (username, email, password) values(?,?,?)`, [username, email, hashedPassword]);

    return {
        id: result.insertId,
        username,
        email
    };
}

async function updateUser(id, data){
    const fields = [];
    const values= [];

    for(const key in data){
        if(key == 'password'){
            const hash = await bcrypt.hash(data.password, 10);
            fields.push('password = ?');
            values.push(hash);
        } else {
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }
    }

    if (!fields.length) {
        return null;
    }

    // id push
    values.push(id)

    

    const [result] = await db.query(`Update users set ${fields.join(", ")} WHERE id=?`, values);

    if (result.affectedRows === 0) {
        return null;
    }

    return ({
        id,
        ...data
    })
}

async function deleteUser(id){
    const [result] = await db.query("DELETE FROM users where id=?", [id]);

    if(result.affectedRows === 0) return null;

    return {id};
}

module.exports = { getUser, createUser, updateUser, deleteUser };