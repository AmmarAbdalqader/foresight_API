const Categories = require("../models/categories.model");

exports.getCategories = (req, res) => {
    Categories.getCategories(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Category with id = ${req.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Category with id " + req.id
                });
            }
        } else {
            return res.send(data);
        }
    });
};

exports.getCategoriesSub = (req, res) => {
    Categories.getCategoriesSub(req.params.categoryID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found CategoriesSub with categoryID = ${req.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving CategoriesSub with categoryID " + req.id
                });
            }
        } else {
            return res.send(data);
        }
    });
};