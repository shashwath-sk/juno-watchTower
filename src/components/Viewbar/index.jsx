import React, { useState } from 'react';
import './index.css';
import {getData} from '../../utils/dataService';

export default function Viewbar( {handleShowFeatures}) {
    const viewbarFeatures = getData.viewbarFeatures();
    const [activeFeature,setActiveFeature] = useState(null);
    
    const handleFeatureClick = (feature)=>{
        setActiveFeature(feature);
        handleShowFeatures(feature);
    }
    return(
        <div className='main-container'>
            <div className='viewbar-container'>
            <div className='viewbar-header'>
                <div className='gray-line'></div>
                <div className='logo-here'>LOGO HERE</div>
                <div className='gray-line'></div>
            </div>
            <div className='viewbar-features'>
                {
                    viewbarFeatures && viewbarFeatures.map((feature,index) => {
                        return (
                            <span key={index} className={`viewbar-feature ${activeFeature===feature?'active':''}`} onClick={()=>handleFeatureClick(feature)}>{feature}</span>
                        );
                    })
                }
            </div>
            <div class="user-container">
                <div class="user-icon">
                    <img src="https://www.livemint.com/lm-img/img/2023/06/04/600x338/elon_musk_1685867807382_1685867817913.jfif" alt="User"></img>
                </div>
                <div class="user-infos">
                    <div class="username">Elon Musk</div>
                    <div class="email">elon@twitter.com</div>
                </div>
            </div>
            
            </div>
            <div className='straight-gray-line'></div>
        </div>
        
    );

}