import express from 'express'
import cors from 'cors'
import redis from 'redis';
import { createClient } from 'redis';

const client = createClient({
    password: 'uazD4aYdjHRzISWbkLCPkEBEs9HRhVBd',
    socket: {
        host: 'redis-19173.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19173
    }
})



client.on("error", (err) => {
    console.log(err);
});

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/api/leaderboard', (req, res) => {
    client.xRevRange("score", 0, 9, 'WITHSCORES', (err, result) => {
        let leaderboard = []
        for (const [idx, value] of result.entries()) {
            if (idx % 2 === 0) {
                let tmp = {}
                tmp["name"] = result[idx]
                tmp["score"] = result[idx+1]
                leaderboard.push(tmp)
            }
        }
        return res.status(200).json(leaderboard)
    })
})

app.get('/api/game/:id', (req, res) => {
    const username = req.params.id
    client.hGet("game", username, (err, result) => {
        if (result) return res.json(JSON.parse(result))
        else return res.status(204).end()
    })
})

app.post('/api/game', (req, res) => {
    const body = req.body
    const username = body.username
    const score = body.wins
    client.hSet("game", username, JSON.stringify(body), (err, result) => {
        client.zAdd("score", score, username, (err, result1) => {
            return res.json(200)
        })
    })
})

const PORT = process.env.port || 8081
app.listen(PORT, () => {
    console.log('Server is running...')
})
