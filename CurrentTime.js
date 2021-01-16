import React from 'react'
import Clock from "react-live-clock";

const CurrentTime = () => {
    return (
        <div className='date-sec'>
              <Clock format="HH-mm-ss" interval={1000} ticking={true}/>
        </div>
    )
}

export default CurrentTime