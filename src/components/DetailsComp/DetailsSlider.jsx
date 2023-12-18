import React from 'react'

const DetailsSlider = ({ photo }) => {
    return (
        <div className='w-[320px] md:w-[840px] h-full m-auto flex items-center justify-center object-cover'>
            <img className='w-[320px] md:w-[800px] h-[240px] md:h-[420px] object-cover rounded-xl' src={photo?.eventPhoto} alt="" />
        </div>
    )
}

export default DetailsSlider