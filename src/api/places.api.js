import { headers, places_api } from './config';
import axios from 'axios';
import { GOOGLE_API_KEY } from '@env';

export const get_google_places_data = async (type = 'json', query, callback) => {
    const url = `${places_api}/${type}?key=${GOOGLE_API_KEY}&query=${query}`;
    await axios({
        method: 'get',
        url: url,
        headers: headers,
    })
        .then(async response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        });
};