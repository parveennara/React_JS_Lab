import axios from 'axios';
import IItem from '../models/IItem';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// function to get items from the backend
const getItems = () => {
    return axios.get<IItem[]>(`${baseUrl}/items`)
        .then(response => response.data)
};

const postItem = (item: Omit<IItem, 'id'>) => {
    return axios.post<IItem>(
        `${baseUrl}/items`,
        item,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.data)
};

export {
    getItems,
    postItem
};