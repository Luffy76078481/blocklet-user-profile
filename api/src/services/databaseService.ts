import { Database } from '@blocklet/sdk';

class DatabaseService {
    private db: Database = new Database('userProfile.db');

    constructor() {
        this.connect();
    }

    async connect() {
        try {
            console.log('Connected to MongoDB');

            try {
                // 初始化时添加默认用户
                const defaultUser = {
                    _id: 'testuesrid_asdbansdmb234923764123jk',
                    username: 'demoUser1',
                    age: 18,
                    email: 'demoUser1@gmail.com',
                    introduction: 'demoUser1demoUser1demoUser1demoUser1demoUser1',
                    nickname: 'demoUser1Nickname',
                    sex: '1',
                };

                await this.db.insert(defaultUser);
            } catch (error) {
                //仅作为面试demo项目临时处理，实际项目不应该有此段逻辑
            }

        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    getConnection() {
        return this.db;
    }
}

export const databaseService = new DatabaseService();