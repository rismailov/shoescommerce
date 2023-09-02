import Axios, { AxiosResponse } from 'axios'

const axios = Axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

axios.interceptors.request.use((request) => request)

axios.interceptors.response.use(
    async (response: AxiosResponse) => response.data,
)

export default axios
