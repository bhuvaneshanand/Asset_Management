import React from 'react'
import './About.css'
import asset from './images/assets.png'


export const About = () => {
  return (
    <div className='about-page'>
        <header className='mt-2'>
            <div className='container h-100 d-flex align-items-center justify-content-center'>
                <h1 className='text-light'>About</h1>

            </div>

        </header>
        <div className='container my-5 '>
        <h4 className='text-center'>What motivated us?</h4>
        <p>This is a product that we have developed to halp organisations maintain the assets of the employee.We were inspired from Service now asset management system. Though we did not have access to asset management system as that requires the organisation's credentials we developed this from What we understood on how the assset management application might workk. </p>
           <h4 className='text-center'>How do we work?</h4>
            <p>In Order to enjoy the perks of the application yo should register yourself. Our application has the role based login so only admins can have the control over asset allocation and showing the visibility od the assets. After registering yourself, all the employees can see the listed assets and theycan make request to the admin where admin will see the request and will decide whether to allocate the asset or not</p>
            <p>Once your details have been verified we will approve your request. Oray!! you will be assigned with the requested assets. <b>For you to get your Employee id contact the adminstrator through email. </b></p>
        
        </div>

    </div>
  )
}
