import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Nav from './Nav.js';
import Side from './Side.js';

const Front = () => {
    return (
        <>
            <div className="row">
                <div><Nav/></div>
            </div>
            <div className="row">
                <div className='col-4'><Side/></div>
                <div className='col-8'><Main/></div>
            </div>
            <div className="row">
                <div><Footer/></div>
            </div>
        </>
    );
}

export default Front;
