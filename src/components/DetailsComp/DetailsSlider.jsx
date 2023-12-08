import React from 'react'

const DetailsSlider = ({ photo }) => {
    return (
        <div className='w-[400px] h-full m-auto flex items-center justify-center object-cover'>
            <img className='w-[400px] h-[280px] object-cover rounded-xl' src={photo?.eventPhoto} alt="" />
        </div>
    )
}

export default DetailsSlider