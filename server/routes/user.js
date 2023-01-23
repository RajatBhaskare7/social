import express from 'express';

import {
    getuser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/user.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', verifyToken, getuser);
router.get('/:id/friends',verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;