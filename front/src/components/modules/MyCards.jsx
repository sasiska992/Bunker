import React from 'react';
import PersonCard from './PersonCard';

const MyCards = () => {
    const data = [
            { id: 1, category: "Фобия", title: "Нарушение закона" },
            { id: 2, category: "Фобия", title: "Мексиканская" },
            { id: 3, category: "Фобия", title: "Мексиканская" },
            { id: 4, category: "Фобия", title: "Мексиканская" },
            { id: 5, category: "Фобия", title: "Мексиканская" },
            { id: 6, category: "Фобия", title: "Мексиканская" },
            { id: 7, category: "Фобия", title: "Мексиканская" },
            { id: 8, category: "Фобия", title: "Мексиканская" },
            { id: 9, category: "Фобия", title: "Мексиканская" },
            { id: 10, category: "Фобия", title: "Мексиканская" },
            { id: 11, category: "Фобия", title: "Мексиканская" },
            { id: 12, category: "Фобия", title: "Мексиканская" }
    ]
    return (
        <>
            {data.map((card) => (
                <PersonCard key={card.id} category={card.category} title={card.title} />
            ))}
        </>
    );
};

export default MyCards;