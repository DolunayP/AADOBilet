import React, { useEffect } from 'react'
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getEventById } from '../../redux/dataSlice';

const DetailsComp = ({ id }) => {
    const { eventById } = useSelector(state => state.data);
    const { eventDesc, eventHour, eventLocation, eventName, eventDate } = eventById;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEventById(id))
    }, [dispatch])

    const handleFacebookShare = () => {
        // Facebook paylaşım URL'si
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        window.open(facebookShareUrl, '_blank');
    };

    const handleInstagramShare = () => {
        // Instagram paylaşım URL
        const instagramShareUrl = `https://www.instagram.com/share?url=${window.location.href}`;
        window.open(instagramShareUrl, '_blank');
    };
    const handleTwitterShare = () => {
        const twitterShareUrl = `https://twitter.com/share?url=${window.location.href}`;
        window.open(twitterShareUrl, '_blank');
    };

    const handleWhatsAppShare = () => {
        const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent('Etkinlik: ' + window.location.href)}`;
        window.open(whatsappShareUrl, '_blank');
    };
    return (
        <>
            <div className='flex flex-col justify-start px-[10%]'>
                <h2 className='text-xl text-left mb-2'>Event: <span className='font-bold'>{eventName}</span></h2>
                <h2 className='text-xl text-left mb-2'>Event Time:<span className='font-bold'>{eventHour}</span></h2>
                <h2 className='text-xl text-left mb-2'>Event Date:<span className='font-bold'>{eventDate}</span></h2>
                <p className='text-justify'>{eventDesc}</p>
                <div>
                    Location: Google Maps Gelecek
                </div>
            </div>

            <div className='text-center flex flex-col items-center justify-center mt-8'>
                <h2 className='font-bold text-3xl my-6'>Share This Event on Social Media Platforms</h2>
                <div className='flex gap-8 text-base font-semibold'>
                    <button className='flex flex-col justify-center items-center' onClick={handleFacebookShare}>
                        <FaFacebook size={38} />
                        <div>Facebook'ta Paylaş</div>
                    </button>
                    <button className='flex flex-col justify-center items-center' onClick={handleInstagramShare}>
                        <FaInstagram size={38} />
                        <div>Instagram'da Paylaş</div>
                    </button>
                    <button className='flex flex-col justify-center items-center' onClick={handleTwitterShare}>
                        <FaTwitter size={38} />
                        <div>Twitter'da Paylaş</div>
                    </button>
                    <button className='flex flex-col justify-center items-center' onClick={handleWhatsAppShare}>
                        <FaWhatsapp size={38} />
                        <div>WhatsApp'ta Paylaş</div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DetailsComp;