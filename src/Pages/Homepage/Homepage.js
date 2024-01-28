import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import GameSection from '../../components/GameSection/GameSection'
import config from  '../../configs/webContentConfig.json'

function Homepage() {
  const {gameSection} = config;
  return (
    <div> 
      <GameSection />
    </div>
  )
}


export default Homepage