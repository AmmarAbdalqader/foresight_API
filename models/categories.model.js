const conn = require("../services/db");
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const Categories = function (user) {
    this.ID = user.ID;
    this.NameAR = user.NameAR;
    this.NameEN = user.NameEN;
    this.Icon = user.Icon;
};
Categories.getCategories = (ID, result) => {
    query(
        `SELECT * FROM categories ${ID != 0 ? " WHERE id = ?" : ""}`,
        [ID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found categories: ", res);
                result(null, res);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};


Categories.getCategoriesSub = (categoryID, result) => {
    query(
        `SELECT * FROM categories_sub ${categoryID != 0 ? " WHERE CategoryID = ?" : ""}`,
        [categoryID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found Categories Sub: ", res);
                result(null, res);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};

module.exports = Categories
