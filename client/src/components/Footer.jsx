import React from 'react'
import logo from '../images/logo.jpg'

const Footer = () => {
  return (
    <div className='footer'>
      <img src={logo} alt='logo_footer'></img>
      <span>Terms of Service</span>
      <span>Privacy</span>
      <span>Content Policy</span>
      <span>Contact</span>
      <span>React.js application</span>
    </div>
  )
}

export default Footer