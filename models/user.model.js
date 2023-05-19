const conn = require("../services/db");
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const User = function (user) {
    this.ID = user.ID;
    this.Name = user.Name;
    this.Username = user.Username;
    this.Password = user.Password;
};

User.signin = async (user, result) => {
    await query(`SELECT * FROM users WHERE username = ? and password = ? and Active = 1`,
        [user.username, user.password],
        async (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                await query(`UPDATE users SET Token = ? WHERE ID = ?`, [user.token, res[0].ID]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};

User.getUserById = (user, result) => {
    query(`SELECT * FROM users WHERE id = ?`, [user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

User.addUser = (user, result) => {
    query(`SELECT * FROM users WHERE username = ?`, user.Username, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result({ kind: "existing" }, null);
            return;
        }

        query(
            `INSERT INTO users SET Name = ?, Username = ?, Password = ?, Photo = ?, SignUpDate = ?, Email = ?, Active = ?, Teacher = ?`,
            [user.Name, user.Username, user.Password, user.Photo, new Date(), user.Email, 1, 0],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("User created : ", { id: res.insertId, ...user });
                result(null, { id: res.insertId, ...user });
            });
    });
};

User.editUser = (user, result) => {
    query(
        `UPDATE users SET Name = ?, Password = ?, Email = ? WHERE ID = ?`,
        [user.Name, user.Password, user.Email, user.ID],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, { "message": "Done" });
                return;
            }
            return;
        });
};

User.getAllUsers = (result) => {
    query(`SELECT * FROM users`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res);
                result(null, res);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};

module.exports = User;

