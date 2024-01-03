import React from 'react'
import Footer from '../components/FooterComp/Footer'
import HeaderTitle from '../components/Header/HeaderTitle'
import HeaderMenu from '../components/Header/HeaderMenu'
import ContactComp from '../components/ContactComp/ContactComp'

const Contact = () => {

    const location = 'Ataşehir/İstanbul'

    return (
        <>
            <div className="bg-color-primary">
                <HeaderMenu />
                <HeaderTitle />
            </div>

            <div className="text-[52px] text-white bg-gradient-to-b from-[#173633] to-[#07a696] rounded-b-full shadow-xl py-12 mb-6">
                CONTACT
            </div>

            <ContactComp />

            <Footer />
        </>
    )
}

export default Contact