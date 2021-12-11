'use strict';

const db = require('./database');

exports.getClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM client';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

exports.deleteAllClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM client';
        db.run(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            else resolve();
        });
    });
};

exports.insertClient = (client) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO client(userid, name, surname, wallet, address) VALUES(?,?,?,?,?)';
        db.run(sql, [client.userid, client.name, client.surname, client.wallet, client.address], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
};

exports.topUp = (clientid, ammount) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE client SET wallet = wallet + ? WHERE userid == ?';
        db.run(sql, [ammount, clientid], function (err) {
            if (err) {
                reject(err);
            }
            if (this.changes === 0) resolve(false);
            else resolve(true);
        });
    });
};

exports.getClientById = (clientid) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM client WHERE userid=?';
        db.get(sql, [clientid], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row); //manage in server.js in row is undefined or not
        });
    });
};

//function to subtract an amout from a client's wallet after the confirmation of the order
//antmat99
exports.subtractFromWallet = (clientid, amount) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE client SET wallet = wallet - ? WHERE userid == ?';
        db.run(sql, [amount, clientid], function (err) {
            if (err) {
                reject(err);
            }
            if (this.changes === 0) resolve(false);
            else resolve(true);
        });
    });
};