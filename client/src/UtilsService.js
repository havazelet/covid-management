import axios from 'axios';

export default class UtilsService {

    getItems(url) {
        return axios.get(url).then(res => res.data);
    }

    getItemsById(url, id) {
        return axios.get(`${url}/${id}`).then(res => res.data);
    }

    setCustomer(url, payload) {
        return axios.post(url, payload).then(res => res.data);
    }

    getCoronabyCustomerId(url, customerId) {
        return axios.get(`${url}/${customerId}`).then(res => res.data);
    }

    getUserbyUserName(url, payload) {
        return axios.get(url, payload).then(res => res);
    }
}