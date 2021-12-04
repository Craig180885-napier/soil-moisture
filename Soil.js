

const express = require('express');
const router = express.Router();

module.exports = router;

const plants = [{id: "0", plantName: 'Avocado', moistureThreshold: '92'},
                {id: "1", plantName: 'Corn',    moistureThreshold: '95'},
                {id: "2", plantName: 'Soy',     moistureThreshold: '70'}]

router.get('/', (_, res) => 
{
    res.send('Your Express App');
});

router.get('/plants', (_, res) => 
{
    res.json({ ok: true, plants });
});

router.get('/plant/:id', (req, res) => 
{
    const { id } = req.params;
    const plant = plants.filter((plant) => plant.id === id)[0];
    res.json({ ok:true, plant });
});

router.post('/addplant', (req, res) => 
{
    const { id, plantName } = req.body;    
    if (id && plantName) 
    {
        plants.push({ is, plantName});
        res.json({ ok: true, plants});
    }    
    
});


