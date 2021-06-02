import ApiCore from "../api/ApiCore"

async function getSensors () {
 return await ApiCore.get('/api/sensors');
}

async function getMeasurements () {
  return await ApiCore.get('/api/measurements');
}

async function load () {
  return await ApiCore.get('/load')
}

export { getSensors, getMeasurements, load }