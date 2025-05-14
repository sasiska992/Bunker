import React from 'react';

const Error = ({firstValue, firstOnChange}) => {
    const handleclick = () => {
        firstValue = 1;
        firstOnChange(firstValue);
    }
    return (
        <div className='error'>
            <h1>Error Page</h1>
            <p class="zoom-area">Произошло что-то непредвиденное</p>
            <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
            </section>
            <button onClick={handleclick} className="return">
                <img src="./img/return.svg" alt="return" />
            </button>
        </div>
    );
};

export default Error;