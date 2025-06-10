import React, { useState } from 'react';

const PersonReverseCard = ({ category, title, child = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleCard = () => {
        setIsOpen(true);
    };

    return (
        <div
            className={`personCard ${!isOpen ? 'personCard-close' : ''}`}
        >
            <div className="front">
                <div className="front-wrapper">
                    <div className="category">{category}</div>
                    <div className="line"></div>
                </div>
                <img src={`/img/${category}.svg`} className={category === 'Доп. информация' || category === 'Последствия катастрофы' ? 'minImg' : ''} alt={category} />
                <div className="front-wrapper">
                    <div className="line"></div>
                    <div className="title">{title}</div>
                </div>
            </div>

            {child ? (
                <div className="back">
                    <img src="/img/bunkerLogo.svg" alt="bunkerIcon" />
                </div>
            ) : null}
        </div>
    );
};

export default PersonReverseCard;