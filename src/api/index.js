import axios from 'axios'

export const BASE_URL = 'http://localhost:5016/';

export const ENDPOINTS = {
    auth: 'auth',
    teachers:'teachers',
    courses :'course'
}

export const createAPIEndpoint = (endpoint,header) => {

    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord, header),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }

}