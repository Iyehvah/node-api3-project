// code away!
const express = require("express")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")
const welcomeRouter = require("./welcome/welcomeRouter")

const logger = require("./middlewares/logger")

const server = express()
const port = 5000;

server.use(express.json())
server.use(logger("short"))
server.use("/", welcomeRouter)
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

//this is our ERROR MIDDLEWARE or .catch middleware
server.use((err, req, res, next) => {
	//"catches" our errors
	console.log(err)
	res.status(500).json({
		message: "Something went wrong.. ",
	})
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})