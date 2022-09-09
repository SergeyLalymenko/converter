import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.apilayer.com/currency_data',
    headers: {
        apikey: '80jM7pwJzdDLjrrqw7c9mzNfHmWGUVUt',
    },
});
