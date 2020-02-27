const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send(`<h1>Welcome to your USER API</h1>`)
})

router.get("/api", (req, res) => {
    res.json({
        message: "Welcome to your USER api front end devs"
    })
})

module.exports = router