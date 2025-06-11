import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const PersonReverseCard = ({ category, title, child = 0, cardId, activeTab , socketRef}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {roomId} = useParams()

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!socketRef.current) return;
      
        const handleMessage = (event) => {
          const data = JSON.parse(event.data);
      
          if (data.type === "cardOpenedConfirmation") {
            console.log("✅ Сервер подтвердил открытие карточки:", data.card_id);
          }
      
          if (data.type === "cardOpened") {
            console.log("📡 Карточка открыта (сокетом):", data.card_id);
          }
          
          if(data.card_id == cardId) {
            console.log("Adding")
            toggleCard()
          }
        };
      
        socketRef.current.addEventListener("message", handleMessage);
      
        return () => {
          socketRef.current?.removeEventListener("message", handleMessage);
        };
      }, []);

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
                </div>
            ) : null}
        </div>
    );
};

export default PersonReverseCard;