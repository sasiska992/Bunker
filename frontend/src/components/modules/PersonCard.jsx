import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PersonCard = ({ category, title, child = 0, cardId, socketRef, activeTab = 0 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const {roomId} = useParams()

    const handleOpenClick = (e) => {
        e.stopPropagation();
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({
                  type: "openCard",
                  card_id: cardId,
                  tab_id: activeTab,
                  room_id: roomId
                }));
          
                console.log("📤 Отправили открытие карточки", cardId);
              } 
              else {
                    console.warn("Сокет не подключен");
              }
        }
    };

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
                <img src={`/img/${category}.svg`} className={category === 'Доп. информация' || category === 'Последствия катастрофы' ? 'minImg' : ''} alt={category} />
                <div className="front-wrapper">
                    <div className="line"></div>
                    <div className="title">{title}</div>
                </div>
            </div>

            {child ? (
                <div className="back">
                    <img src="/img/bunkerLogo.svg" alt="bunkerIcon" />
                    <button onClick={handleOpenClick}>Open</button>
                </div>
            ) : null}
        </div>
    );
};

export default PersonCard;