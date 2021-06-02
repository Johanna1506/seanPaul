import axios from 'axios'
import authHeader from './authHeader'
import {API_CORE_BASE_URL, TIMEOUT} from '../config'

class ApiCore {
  constructor () {
    const axiosConfig = {
      baseURL: API_CORE_BASE_URL,
      timeout: TIMEOUT,
      responseType: 'json',
      headers: authHeader()
    }
    this.axiosConfig = axiosConfig
    axios.create(this.axiosConfig)
  }

  async get (path) {
    return await axios.get(path, this.axiosConfig).then((response) => {
      return response
    })
  }

  async post(path, payload) {
    return axios
      .post(path, payload, this.axiosConfig)
      .then((response) => {
        return response
      })
      .catch((err) => {
        return err
      })
  }


}

export default new ApiCore()
