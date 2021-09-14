import Task from '../models/task';

import { publishToQueue } from '../services/mqservice';

const defaultQueue = "tasks";

export default {
    create: (req, res) => {
        const { title, done } = req.body;
        const payload = { title: title, owner: req.owner, done: done }

        let task = new Task(payload)

        task.save((err, data) => {
            if (!err) {
                let msg = { html: `<h1>Trello Clone:</h1><p>Tarefa ${task.title} criada com sucesso!</p>`, email: task.owner }
                publishToQueue(defaultQueue, JSON.stringify(msg));
                return res.status(200).json(data)
            }

            if (err.name === "ValidationError") {
                return res.status(400).json(err)
            }

            return res.status(500).json(err)
        })
    },
    list: (req, res) => {

        let query = {
            owner: req.owner
        }

        if (req.query.name) {
            query.name = new RegExp(req.query.name, 'i')
        }

        Task.find(query, {}, { sort: '-date' }, (err, result) => {
            return res.status(200).json({ tasks: result });
        })
    },
    get: (req, res) => {
        let id = req.params.id

        Task.findById({ _id: id, owner: req.owner }, {}, { sort: '-date' }, (err, result) => {
            if (!result) {
                return res.status(404).end();
            } else {
                return res.status(200).json(result);
            }
        })
    },
    remove: (req, res) => {
        Task.findOneAndDelete({ _id: req.params.id, owner: req.owner }, (err, result) => {
            if (result) {
                return res.status(200).end();
            } else {
                return res.status(404).end();
            }
        })
    },
    update: async (req, res) => {

        const task = await Task.findOne({ _id: req.params.id, owner: req.owner })

        if (!task)
            return res.status(404).end();

        Task.findByIdAndUpdate({ _id: req.params.id, owner: req.owner }, { $set: req.body }, (err, result) => {
            if (result) {
                return res.status(200).end();
            } else {
                return res.status(404).end();
            }
        })
    }
}