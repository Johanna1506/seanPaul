import React, { useEffect, useState } from 'react';
import { getSensors, load } from '../services/service';


export default function Home() {
  const [sensors, setSensors] = useState()
  const [loading, setLoading] = useState(true)
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  useEffect(() => {
    load().then(resp => {
      if(resp.status === 200) {
        setLoading(false)
      }
    })
    getSensors().then(resp => {
      const { data } = resp
      setSensors(data['hydra:member'])
    })
  },[] )

  if(loading) {
    return <div className="lds-dual-ring"></div>
  }
  return (
    <div className='home'>
      <h1>Accueil</h1>
      {sensors && (
        <ul>
          {sensors.map(sensor => (
            <li onClick={() => window.location.replace('/DHT11')}>{sensor.name}</li>
          ))}
        </ul>
      )}
      <button onClick={() => logout()}>Deconnexion</button>
    </ div>
  )
}