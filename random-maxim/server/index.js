const express = require("express")
const fs = require("fs")
const cors = require("cors")

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"))

const checkIndex = (id, res) => {
    if (isNaN(id)) {
        res.json({ rs : false, msg : "id shd be a number" })
        return false;
    }
    const idx = parseInt(id);
    if (data.length <= idx || idx < 0) {
        res.json({ rs : false, msg : "id out of range" })
        return false;
    }
    return true;
}

const app = express()
app.use(express.json())     // body를 JSON으로 쓸 수 있게 해주는 미들웨어
app.use(cors())

app.get("/", (req, res) => {
    const { author, message } = req.query;
    let _data = data;
    res.json(_data
        .filter(value => author? value.author.includes(author) : true)
        .filter(value => message? value.message.includes(message) : true)
    );
})
app.get("/random", (req, res) => {
    const rand = Math.floor(Math.random() * data.length);
    res.json(data[rand]);
})
app.get("/:id", (req, res) => {
    const { id } = req.params;
    if (checkIndex(id, res)) res.json(data[parseInt(id)]);
})
app.post("/", (req, res) => {
    const { author, message } = req.body;
    if (!!author && !!message) {
        data.push({
            author: author,
            message: message
        })
        // res.json(data);
        res.json({ rs : true });
    }
    else res.json({ rs : false, msg : "data input shd be complete" })
})
app.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (checkIndex(id, res)) {
        data.splice(parseInt(id), 1);
        // res.json(data);
        res.json({ rs : true });
    }
})
app.put("/:id", (req, res) => {
    const { id } = req.params;
    if (checkIndex(id, res)) {
        const { author, message } = req.body;
        if (!!author && !!message) {
            data[idx] = {
                author: author,
                message: message
            };
            // res.json(data);
            res.json({ rs : true });
        }
        else res.json({ rs : false, msg : "data input shd be complete" });
    }
})

app.listen(8080, () => {
    console.log("running ...");
})