import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from './Content.js';

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path=':isi' element={<Content />}/>
            </Routes>
        </div>
    );
}

export default Main;
