// https://economia.awesomeapi.com.br/json/ BASE DA URL QUE VAI BUSCAR  

// all/EUR-BRL rota das requisições

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/'
});

export default api;