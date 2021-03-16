import request from "@/request";
import API from '@/config/api.config'

export const getLogin = async (data: any) => request(`${API.login}`, {
    data,
    method: 'POST'
});

export const getCurrentUser = async (params: any):Promise<any> => request(`${API.getCurrentUser}`, {
    method: 'GET',
    params
});
