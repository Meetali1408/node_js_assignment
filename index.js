const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const loadData = ()=>{
    const data = fs.readFileSync('data.json', 'utf8');
    // console.log(data);
    return JSON.parse(data);
}

const saveData = (data)=>{
    fs.appendFileSync('data.json', JSON.stringify(data, null, 2), e=>console.log(e))
}

// Get all items
app.get('/call', (req, res)=>{
    console.log("data is passed");
    const data = loadData()
    console.log(data);
    res.json(data.list)
})

// Add a new itetm
app.post('/call', (req, res)=>{
    const data   =   loadData();
    const lists = req.body;
    console.log("adding new items:",lists);
    data.list.push(lists);
    saveData(data);
    res.status(201).json(lists)
})

// Update an  item
// URL => localhost:5000/item/1000 
app.put('/call/:index', (req, res)=>{
    const data =   loadData();
    const index = Number(req.params.index);

    if(index>=0 && index < data.list.length){
        data.list[index]=req.body;
    saveData(data);
    res.json('ok');
    } else {
        res.status(404).send('Item not found')
    }
})

// Delete an  item 
app.delete('/call/:index', (req, res)=>{
    const data =   loadData();
    const index = Number(req.params.index);

    if(index>=0 && index < data.list.length){
        data.list.splice(index,1);
        saveData(data);
    res.json('ok');
    } else {
        res.status(404).send('Item not found')
    }
})

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT ${PORT}`)
})
