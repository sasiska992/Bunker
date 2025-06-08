import React, { useState } from 'react';

const PersonCard = ({ category, title, child = 0 }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`personCard ${!isOpen ? 'personCard-close' : ''}`}
            onClick={child ? toggleCard : undefined}
        >
            <div className="front">
                <div className="front-wrapper">
                    <div className="category">{category}</div>
                    <div className="line"></div>
                </div>
                <img src={`/img/${category}.svg`} className={category === 'Доп. информация' ? 'minImg' : ''} alt={category} />
                <div className="front-wrapper">
                    <div className="line"></div>
                    <div className="title">{title}</div>
                </div>
            </div>

            {child ? (
                <div className="back">
                    <img src="/img/bunkerLogo.svg" alt="bunkerIcon" />
                    <button>Open</button>
                </div>
            ) : null}
        </div>
    );
};

export default PersonCard;