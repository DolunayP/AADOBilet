import React from 'react'

const SliderCard = ({ img, isDetails }) => {

    return (<>
        {
            !isDetails ?
                < div style={{ boxShadow: '3px 11px 15px 0px rgba(0,0,0,0.5)' }} className='group artist-card relative transition-{flex} duration-500 ease hover:flex-[0.85] cursor-pointer h-[380px] flex-[0.33] md:flex-[0.25] rounded-md overflow-hidden object-cover -skew-x-[6deg]' >
                    <img className='w-full h-full object-cover object-top' src={img} alt="" />
                    <div className='w-[99%] group-hover:opacity-100 group-hover:translate-y-0 translate-y-[200%] text-white transition-all duration-700 bg-[#32847a] rounded-md p-4 absolute bottom-1 left-1 opacity-0 me-1'>
                        <h2 className='font-bold'> XXXXX KONSERİ</h2>
                        <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, alias.</p>
                        <button className='shadow-xl mt-4 me-4 py-3 px-6 bg-black text-white hover:scale-95 hover:text-[#6cebdc] transition-all duration-500'>See Details </button>
                    </div>
                </div >
                :
                < div style={{ boxShadow: '3px 11px 15px 0px rgba(0,0,0,0.5)' }} className='group artist-card relative transition-{flex} duration-500 ease hover:flex-[0.85] cursor-pointer h-[380px] flex-[0.33] md:flex-[0.25] rounded-md overflow-hidden object-cover -skew-x-[6deg]' >
                    <img className='w-full h-full object-cover object-top' src={img} alt="" />
                </div >
        }
    </>
    )
}

export default SliderCard