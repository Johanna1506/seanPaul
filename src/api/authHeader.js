export default function authHeader() {
  const token = localStorage.getItem('token');
  if (token) {
    return { "X-Auth-Token": token };
  } else {
    return {};
  }
}
