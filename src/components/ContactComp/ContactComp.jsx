import React from 'react'
import MapsComp from '../DetailsComp/MapsComp'
import { FaRegEnvelope } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";

const ContactComp = () => {
    const location = 'kulesi, Atasehir/İstanbul'

    return (
        <div className='px-[3%] md:px-[8%] overflow-hidden'>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <div className='text-5xl font-bold mb-9'>CONTACT INFO</div>
                    <div className='flex flex-wrap gap-8 items-center justify-center text-3xl font-bold'>
                        <div><a className='text-center flex items-center justify-center gap-4' href="mailto:info@adobilet.com"><FaRegEnvelope /> Mail Gönder</a></div>
                        <div><a className='text-center flex items-center justify-center gap-4' href="tel:+90 555 55 55"><FaSquarePhone /> Telefon et</a></div>
                        <div><a className='text-center flex items-center justify-center gap-4' href="tel:+90 555 55 55"><FaSquarePhone /> Telefon et</a></div>
                        <div className="text-center flex items-center justify-center gap-4" ><FaMapLocationDot /> Adres: Ataşehir/İstanbul</div>
                    </div>
                </div>
                <div>

                </div>
                <div className='my-8 shadow-lg rounded-lg overflow-hidden'><MapsComp location={location} /> </div>

            </div>
        </div >
    )
}

export default ContactComp