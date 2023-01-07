const conn = require("../services/db");

const User = function(user){
    this.ID = user.ID;
    this.Name = user.Name;
    this.Username = user.Username;
    this.Password = user.Password;
};

User.getUser = (user, result) => {
    conn.query(`SELECT * FROM users WHERE username = ? and password = ?`, [user.username, user.password], (err, res) =>{
        if(err){
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

User.addUser = (user, result)  => {
    conn.query(`SELECT * FROM users WHERE username = ?`, user.Username, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        if (res.length) {
            result("existing", null);
            return;
        }
        
        conn.query(`INSERT INTO users SET ?`, user, (err, res) =>{
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

module.exports = User;

