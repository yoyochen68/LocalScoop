const app = require("./app")
const mysql = require("mysql2")


const PORT = process.env.PORT || 8000; // let express set PORT, else make it 8000

app.listen(PORT, () => console.log(`server should be running at http://localhost:${PORT}/`))


