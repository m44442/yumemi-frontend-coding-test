import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'https://yumemi-frontend-engineer-codecheck-api.vercel.app',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'
    }
})

