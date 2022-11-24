import axios from 'axios';
const baseURL = 'https://alpha-api.flowco.io';

const client = axios.create({
    baseURL,
    timeout: 100000,
});

export const submitAPI = (request: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
}) => {
    return client.post('/xmas/submit', request).then(res => res.data.data)
}

export const drawAPI = (clientId: string) => {
    return client.get(`xmas/${clientId}/lucky-draw`).then(res => res.data.data)
}