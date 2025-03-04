import React from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
    {
        url: 'https://www.slt.lk/sites/default/files/2024-12/home_slider/WhatsApp%20Image%202024-12-17%20at%2013.09.15.jpeg',
        caption: 'First Slide'
    },
    {
        url: 'https://www.slt.lk/sites/default/files/2024-12/home_slider/WhatsApp%20Image%202024-12-31%20at%207.45.55%20AM%20%281%29.jpeg',
        caption: 'Second Slide'
    },
    {
        url: 'https://www.slt.lk/sites/default/files/2023-02/product_highlight_images/7xFun-highlights.jpg',
        caption: 'Third Slide'
    },
    {
        url: 'https://www.slt.lk/sites/default/files/2022-07/product_highlight_images/UnlimiEntertainBundle-home.jpg',
        caption: 'Fourth Slide'
    },
    {
        url: 'https://www.slt.lk/sites/default/files/2025-01/home_slider/web%20site-100%20%282%29.jpg',
        caption: 'Fifth Slide'
    },



];

export const ImageSlider = () => {



    return (
        <div style={{ width: '100%' }} className="slide-container">
            <Fade>
                {fadeImages.map((fadeImage, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', height: 450 }} src={fadeImage.url} />

                    </div>
                ))}
            </Fade>
        </div>
    )
}

