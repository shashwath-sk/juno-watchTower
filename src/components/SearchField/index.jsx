import * as React from 'react';
import search1 from '../../assets/search/search1.png';
import './index.css';

export default function SearchField({ onChange } ) {
    return(
        <div className='filter-container'>
            <img src={search1} alt="search" />
            <input type="text" placeholder="Search" onChange={onChange} />
        </div>
    );

}

