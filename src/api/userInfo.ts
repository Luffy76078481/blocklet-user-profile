
import api from './index';
import { AxiosResponse } from 'axios';



export type UserInfo = {
    age: number
    createdAt: string
    email: string
    introduction: string
    nickname: string
    sex: string
    updatedAt: string
    username: string
    _id: string
}
interface GetUserInfo {
    (): Promise<AxiosResponse<UserInfo, any>>
}
/**
 * 获取用户信息
 * @returns Promise<AxiosResponse<UserInfo, any>>
 */
export const apiGetUserInfo: GetUserInfo = () => 
api.get('/api/users/getInfo')


interface UpdateUserInfo {
    (params: UserInfo): Promise<{ code: number }>
}
/**
 * 更新用户信息
 * @param params 
 * @returns Promise<{ code: number }
 */
export const apiUpdateUserInfo: UpdateUserInfo = (params) =>
    api.post('/api/users/updateInfo', { params })


