import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.0.101:3001/' //server url (server project: https://github.com/ViniciusRossmann/myTracking)
})