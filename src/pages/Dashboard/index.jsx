import React, {useState} from 'react';
import {Viewbar, Monitor} from '../../components'
import { useNavigate } from 'react-router-dom';
import './index.css'


export default function Dashboard(){

    const naviate = useNavigate();
    const [showMonitor, setShowMonitoring] = useState(false);
    

    const handleShowFeatures = (feature)=>{
        switch(feature){
            case 'Monitoring':
              setShowMonitoring(true);
              break;
            default:
                setShowMonitoring(false);
                naviate('/');
              break;
          }    
    }

    return(
        <div className='main-container'>
            <Viewbar handleShowFeatures={handleShowFeatures}/>
            {showMonitor&&<Monitor/>}
        </div>
    );
}