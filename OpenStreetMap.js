import React,{useState} from 'react'
import { MapContainer,useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet'

const OpenStreetMap = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  return (
    <div className="openmap">
          <button className='btn'>Click The Map To Reach Your Location</button>
       <MapContainer
          center={{ lat: 48, lng: 14 }}
          zoom={13}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <LocationMarker />
      </MapContainer>,
    </div>
  )
}

export default OpenStreetMap
