import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p className='mt-2'>© All Rights Reserved 2024.</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='hover:text-blue-500'>
                    <FaFacebook/>
                </a>
                <a href='' className='hover:text-pink-900'>
                    <FaInstagram/>
                </a>
                <a href='https://www.linkedin.com/in/varsha-050211282/' className='hover:text-blue-600'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer 