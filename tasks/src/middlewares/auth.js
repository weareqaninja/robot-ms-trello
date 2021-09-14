"use strict";

import { Console } from 'console';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).end();
    }
    const [, token] = authHeader.split(' ');
    try {
        const decode = await promisify(jwt.verify)(token, 'qaninja');
        // console.log(decode)
        req.owner = decode.owner;
        req.id = decode.id;
    }
    catch (err) {
        return res.status(401).json({ error: 'Expired or incorrect token' });
    }
    return next();
};
