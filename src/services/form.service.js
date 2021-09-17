import axios from 'axios';

const API_URL = 'http://localhost:3001/api/forms';

class FormService {
    getForm(id) {
        return axios.get(API_URL + id);
    }

    postForm(data) {
        return axios.post(API_URL, data);
    }
}

export default new FormService();