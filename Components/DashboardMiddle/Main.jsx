import React, { useEffect, useState } from 'react'
import GeneralInfo from './GeneralInfo';
import SocialMedia from './SocialMedia';
import Account from './Account';
import Feedbacks from './Feedbacks';
import PageLayout from './PageLayout';
import PaymentDetails from './PaymentDetails';
import SEO from './SEO';
import Thumbnail from './Thumbnail';
import VideoEmbedding from './VideoEmbedding';
import Loader from '@/Components/Workers/Loader';

const Main = ({ component }) => {

    const [pageLoading, setPageLoading] = React.useState(false);

    const componentMap = {
        GeneralInfo: GeneralInfo,
        SocialMedia: SocialMedia,
        Account: Account,
        Feedbacks: Feedbacks,
        PageLayout: PageLayout,
        PaymentDetails: PaymentDetails,
        SEO: SEO,
        Thumbnail: Thumbnail,
        VideoEmbedding: VideoEmbedding,
    };

    const formattedComponent = component.split(" ").join("");
    const ComponentToRender = componentMap[formattedComponent];

    useEffect(() => {
        setPageLoading(true)
        setTimeout(() => { setPageLoading(false) }, 200)
    }, [ComponentToRender])

    if (pageLoading) {
        return <Loader />
    }
    
    return (
        <>
            <ComponentToRender />
        </>
    )
}

export default Main