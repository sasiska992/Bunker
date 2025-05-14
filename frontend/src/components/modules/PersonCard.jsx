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
            {/* Передняя сторона карточки */}
            <div className="front">
                <div className="category">{category}</div>
                <div className="line"></div>
                <img src={`/img/${category}.svg`} alt={category} />
                <div className="line"></div>
                <div className="title">{title}</div>
            </div>

            {/* Задняя сторона карточки */}
            {child ? (
                <div className="back">
                    <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
                    <button>Open</button>
                </div>
            ) : null}
        </div>
    );
};

export default PersonCard;