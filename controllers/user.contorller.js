const User = require("../models/user.model");

exports.signin = (req, res) => {
    User.signin(req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(444).send({
            message: `Not found User with username = ${req.body.username} && password = ${req.body.password}.`
          });
        } else {
            return res.status(500).send({
            message: "Error retrieving User with username " + req.body.username
          });
        }
      } 
      
      return res.send(data);
    });
  };

exports.getUserById = (req, res) => {
    User.getUserById(req.params, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found User with id = ${req.id}.`
          });
        } else {
            return res.status(500).send({
            message: "Error retrieving User with id " + req.id
          });
        }
      } else{
        return res.send(data);
      } 
    });
  };

exports.addUser = (req, res) => {
    User.addUser(req.body, (err, data) => {
      
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

exports.editUser = (req, res) => {
    User.editUser(req.body, (err, data) => {
      
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Cannot edit User ${req.Username}.`
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

