import React from 'react'
import {Link} from 'react-router-dom';

const PopupBox = ({text, link, btnText}) => (
    <div className='popup-box sm:text-xl sm:leading-snug text-center 
    bg-[#ffe81f] rounded-md py-4 px-8 text-white mx-5'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-brutalism-blue'>
            {btnText}
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center 
        bg-cyan-500 rounded-md py-4 px-8 text-[#ffe81f] mx-5'>
            Hello, Welcome Back
            <br/>
            Scroll to book your Consultation
        </h1>
    ),
    2: (
        <PopupBox 
            text="Testing about life and everything in between"
            link="/about"
            btnText="Learn More"
        />
    ),
    3: (
        <h1>3</h1>
    ),
    4: (
        <h1>4</h1>
    )
}



const HomePopup = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomePopup