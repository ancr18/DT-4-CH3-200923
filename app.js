const fs = require('fs')

const express = require('express')
const app = express()

// middleware express
app.use(express.json());

const port = process.env.port || 3000;

// mengecek aplikasi jalan atau tidak
// app.get('/', (req, res) => {
// //   res.send('Hello FSW 2')
//     res.status(200).json({
//         message : "Hello FSW2"
//     })
// })

// app.post('/', (req, res) => {
//     res.status(200).send('ini API untuk post')
// })

// req by all data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data : {
            tours
        }
    })
})

// req by id
app.get('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    
    if(!tour) {
        return res.status(404).json({
            status : 'failed',
            message: `data with ${id} this not found`
        })
    }

    res.status(200).json({
        status: 'success',
        data : {
            tour
        }
    })
})

// api create new data
app.post('/api/v1/tours', (req, res) => {
    // generate id untuk data baru dari req api
    const newId = tours[tours.length - 1].id + 1;
    const newData = Object.assign({id: newId}, req.body)
    console.log(req.body)

    tours.push(newData);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data : {
                tour : newData
            }
        })
    })
})

// api update
app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1
    const tourIndex = tours.findIndex(el => el.id === id)
    
    if(tourIndex === -1) {
        return res.status(404).json({
            status : 'failed',
            message: `data with ${id} this not found`
        })
    }

    tours[tourIndex] = {...tours[tourIndex], ...req.body}

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: "success",
            message : `tour with this id ${id} edited`,
            data : {
                tour : tours[tourIndex]
            }
        })
    })
})



// api delete
app.delete('/api/v1/tours/:id', (req, res) => {
    //  * 1 untuk membuat string ke number
    const id = req.params.id * 1

    const tourIndex = tours.findIndex(el => el.id === id);
    if(tourIndex === -1){
        return res.status(404).json({
            status: 'failed',
            message : `index ${id} not found`
        })
    }

    tours.splice(tourIndex, 1);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: "succes",
            message: "success delete data",
            data : null
        })
    })


})

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})