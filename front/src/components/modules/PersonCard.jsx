import React from 'react';

const PersonCard = ({category, title}) => {
    return (
        <div className='personCard'>
            <div className="category">{category}</div>
            <div className="line"></div>
            {/* название категории == картинке для этой категории */}
            <img src={`/img/${category}.svg`} alt={category} /> 
            <div className="line"></div>
            <div className="title">{title}</div>
        </div>
    );
};

export default PersonCard;