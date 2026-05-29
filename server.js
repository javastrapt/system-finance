import express from 'express';
import cors from 'cors';
import fs from 'fs';
const Port = 3000;

const app = express();

const DataFilePath = "./src/data/transactions.json";

app.use(express.json());
app.use(cors({
    origin: "http://localhost: 4321"
}))

app.get('/', (req, res) => {
    res.send('system ready....')
});

app.get('/api/transactions', (req, res) => {
    try {
        const fileData = fs.readFileSync(DataFilePath, 'utf-8');
        const json = JSON.parse(fileData);
        res.json(json)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: message })
    }
});

app.post('/api/transactions', (req, res) => {
    const rawEntry = req.body;
    try {
        const fileData = fs.readFileSync(DataFilePath, 'utf-8');
        const json = JSON.parse(fileData);

        const newId = json.lnegth > 0
        ? Math.max(...json.map(item => Number(item.transId) || 0)) + 1
        : 2600

        const newEntry = {
            transId: newId,
            ...rawEntry
        };

        json.push(newEntry);

        fs.writeFileSync(DataFilePath, JSON.stringify(json, null, 2))

        res.json({
            message: 'Successfully created new record!',
            data: newEntry
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: message })
    }
})

app.listen(Port, () => {
    console.log(`Port portin' per port ${Port}`)
})