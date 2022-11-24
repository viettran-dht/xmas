import axios from 'axios';
const baseURL = 'https://alpha-api.flowco.io';

const client = axios.create({
    baseURL,
    timeout: 100000,
});

export const submit = (request: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
}) => {
    return client.post('/xmas/submit', request)
}

export const draw = (clientId: string) => {
    return client.post(`xmas/${clientId}/lucky-draw`)
}