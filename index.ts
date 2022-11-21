import dotenv from "dotenv";
import express from "express"

dotenv.config();
const app = express()
const port = process.env.PORT || 8080
app.get("/", (_, res) => res.send("Hello World"))

app.listen(port, () => {
    console.log(`Application running on port ${port}.`)
})
