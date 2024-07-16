import { Request, Response } from 'express';
import { databaseService } from '../services/databaseService';
import { omit } from 'lodash';

class UserController {
    private db = databaseService.getConnection()
    async getUser(req: Request, res: Response) {
        try {
            const { authorization } = req.headers;
            const user = await this.db.find({ _id: authorization });
            if (!user || !user?.length) {
                return res.status(404).json({ code: 404, message: 'User not found' });
            }
            res.json({ code: 200, data: omit(user[0], ['createdAt','updatedAt','_id']) });
        } catch (error) {
            console.error('服务端错误', error)
            res.status(500).json({ code: 500, message: 'Internal server error' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { authorization } = req.headers;
            const { username, age, email, introduction, nickname, sex, phone } = req.body.params;
            // 数据验证
            if (!username || !age || !email || !sex) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const updatedUser = await this.db.update({ _id: authorization }, {
                username,
                age,
                email,
                introduction,
                nickname,
                sex,
                phone
            });
            if (!updatedUser[0] || updatedUser[0] === 0) {
                return res.status(404).json({code:404, message: 'User not found' });
            }

            res.json({code:200, message: 'success' });
        } catch (error) {
            res.status(500).json({code:500, message: 'Internal server error' });
        }
    }
}

export default new UserController();