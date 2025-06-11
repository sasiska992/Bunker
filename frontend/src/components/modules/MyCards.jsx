import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const MyCards = ({res, socketRef}) => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { roomId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {

        const mappedCards = [
          { id: 1, category: "Пол", title: res.sex },
          { id: 2, category: "Возраст", title: res.age },
          { id: 3, category: "Здоровье", title: res.health },
          { id: 4, category: "Профессия", title: res.profession },
          { id: 5, category: "Инвентарь", title: res.inventory },
          { id: 6, category: "Фобия", title: res.phobia },
          { id: 7, category: "Хобби", title: res.hobby },
          { id: 8, category: "Нарушение закона", title: res.violation_of_law },
          { id: 9, category: "Доп. информация", title: res.additional_information },
          { id: 10, category: "Вредная привычка", title: res.bad_habits },
          { id: 11, category: "Опыт", title: res.work_experience },
          { id: 12, category: "Последствия катастрофы", title: res.impact_of_disaster }
        ];

        setCardsData(mappedCards);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setLoading(false);
        setCardsData([]);
      }
    };

    fetchCards();
  }, [res]);

  if (loading) return;

  return (
    <>
      {cardsData.map((card) => (
        <PersonCard
          key={card.id}
          category={card.category}
          title={card.title}
          child={1}
          cardId={card.id}
          socketRef={socketRef}
        />
      ))}
    </>
  );
};


export default MyCards;