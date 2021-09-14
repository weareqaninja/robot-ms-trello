import User from './models/user';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
    auth: async (req, res) => {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email })

        if (!user)
            return res.status(401).end()

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).end()
        }

        const { id } = user;

        return res.json({
            user: user,
            token: jwt.sign({ id, owner: user.email }, 'qaninja', {
                expiresIn: '10d',
            }),
            expires_in: '10d'
        });

    },
    create: async (req, res) => {

        const { email, password } = req.body;

        const dup = await User.findOne({ email: email })

        if (dup)
            return res.status(409).json({ message: 'Duplicated email!' })

        const password_hash = await bcrypt.hash(password, 8);

        const payload = { email: email, password: password_hash }
        let user = new User(payload)

        user.save((err, data) => {
            if (!err) {
                return res.status(200).json(data)
            }

            if (err.name === "ValidationError") {
                return res.status(400).json(err)
            }

            return res.status(500).json(err)
        })
    }
}