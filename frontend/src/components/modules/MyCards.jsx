import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';

const MyCards = ({res}) => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const json = await res.json();

        const mappedCards = [
          { id: 1, category: "Пол", title: json.sex },
          { id: 2, category: "Возраст", title: json.age },
          { id: 3, category: "Здоровье", title: json.health },
          { id: 4, category: "Профессия", title: json.profession },
          { id: 5, category: "Инвентарь", title: json.inventory },
          { id: 6, category: "Фобия", title: json.phobia },
          { id: 7, category: "Хобби", title: json.hobby },
          { id: 8, category: "Нарушение закона", title: json.violation_of_law },
          { id: 9, category: "Доп. информация", title: json.additional_information },
          { id: 10, category: "Вредная привычка", title: json.bad_habits },
          // { id: 11, category: "Особое условие", title: json.special_condition },
          { id: 11, category: "Опыт", title: json.work_experience },
          { id: 12, category: "Последствия катастрофы", title: json.impact_of_disaster },
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
  }, []);

  if (loading) return;

  return (
    <>
      {cardsData.map((card) => (
        <PersonCard
          key={card.id}
          category={card.category}
          title={card.title}
          child={1}
        />
      ))}
    </>
  );
};


export default MyCards;