import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/');
    }
    return (
        <div className='error'>
            <h1>Error Page</h1>
            <p className="zoom-area">Произошло что-то непредвиденное</p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <button onClick={handleclick} className="return">
                <img src="/img/return.svg" alt="return" />
            </button>
        </div>
    );
};

export default Error;