import ApiCore from "../api/ApiCore"

async function login (payload) {
 return await ApiCore.post('/login', payload)
}

export { login }