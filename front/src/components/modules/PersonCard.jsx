import React, { useState } from 'react';

const PersonCard = ({category, title, child = 0}) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={!isOpen ? 'personCard personCard-close' : 'personCard'} onClick={toggleCard}>
            <div className="category">{category}</div>
            <div className="line"></div>
            {/* название категории == картинке для этой категории */}
            <img src={`/img/${category}.svg`} alt={category} /> 
            <div className="line"></div>
            <div className="title">{title}</div>
            {child ? 
            <div className={isOpen ? 'personCard-reverse' : 'personCard-reverse personCard-reverse-active'}>
                <div className='reverse'>
                    <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
                    <button>Открыть</button>
                </div>
            </div> 
            : ""}
        </div>
    );
};

export default PersonCard;