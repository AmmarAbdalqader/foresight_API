const User = require("../models/user.model");

exports.getUser = (req, res) => {
    User.getUser(req, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found User with username = ${req.username} && password = ${req.password}.`
          });
        } else {
            return res.status(500).send({
            message: "Error retrieving User with username " + req.username
          });
        }
      } else{
        return res.send(data);
      } 
    });
  };

exports.addUser = (req, res) => {
    User.addUser(req, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Cannot add User ${req.Username}.`
          });
        } else {
            return res.status(500).send({
            message: " Username already in use " + req.Username
          });
        }
      } else{
        return res.send(data);
      } 
    });
  };

