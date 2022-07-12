const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express();
app.use(express.json())
app.use(cors())

const data = JSON.parse(fs.readFileSync("data.json"), "utf-8");
const save = () => fs.writeFileSync("data.json", JSON.stringify(data), "utf-8");
const isValidId = (id, res) => {
    if (isNaN(id) || id < 0 || data.length <= id) {
        res.status(400).json({
            "rs": false,
            "msg": "잘못된 id 입니다."
        })
        return false;
    }
    return true
}
const isValidContent = (content, res, tempContent=false) => {
    if (!tempContent && (!content || content?.length === 0)) {
        res.status(400).json({
            "rs": false,
            "msg": "메모 내용이 올바르지 않습니다."
        })
        return false;
    }
    return true;
}

let temp = '';

app.get('/', (req, res) => res.json(data.filter(memo => memo.deleted_at === null)))
app.get('/trash', (req, res) => res.json(data.filter(memo => memo.deleted_at)))
app.get('/temp', (req, res) => res.json({
    "rs": true,
    "content": temp
}))
app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, res);
    if (isValidId(id, res)) {
        if (data[id].deleted_at) {
            res.status(400).json({
                "rs": false,
                "msg": "잘못된 id 입니다."
            })
        }
        else res.json(data[id])
    }
})

app.delete('/', (req, res) => {
    for (let memo of data)
        if (!memo.deleted_at) memo.deleted_at = Date.now()
    save();
    res.json({
        rs: "true", 
        msg: "삭제되었습니다."
    })
})
app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, res);
    if (isValidId(id, res)) {
        data[id].deleted_at = Date.now();
        save();
        res.json({
            rs: "true", 
            msg: "삭제되었습니다."
        })
    }
})

app.post('/', (req, res) => {
    const { content } = req.body;
    if (isValidContent(content, res)) {
        data.push({
            content,
            created_at: Date.now(),
            last_modified: Date.now(),
            deleted_at: null
        })
        res.json(data)
        save()
    }
})
app.post('/temp', (req, res) => {
    const { content } = req.body
    if (isValidContent(content, res, true)) {
        temp = content
        res.json({
            rs: true
        })
    }
})

app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, res);
    const { content } = req.body;
    if (isValidId(id, res) && isValidContent(content, res)) {
        data[id].content = content;
        data[id].last_modified = Date.now()
        res.json(data[id])
        save()
    }
})

app.listen(8080, () => {
    console.log('running ...');
})