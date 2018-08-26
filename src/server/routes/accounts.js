const express = require("express");
const router = express.Router();
const AccountService = require("../services/AccountService");

router
.post("/login", async(req, res) => {
    const {email , password} = req.body;
    const result = await AccountService.login(email, password);
    return res.send(result).end();
});

module.exports = router;
