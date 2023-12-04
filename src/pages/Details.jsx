import React, { useEffect } from 'react'
import SliderComp from '../components/slidercomp/SliderComp';
import HeaderView from '../components/Header/HeaderView';
import DetailsComp from '../components/DetailsComp/DetailsComp';
import { useParams } from 'react-router-dom';


const Details = () => {
    const { id } = useParams();
    return (
        <>
            <HeaderView />
            <div className='font-bold text-center text-[44px] text-[#32847a] mt-4'>
                EVENT DETAILS
            </div>
            <SliderComp />
            <DetailsComp id={id} />
        </>
    )
}

export default Details