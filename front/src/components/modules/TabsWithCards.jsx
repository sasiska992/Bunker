import React, { useState } from 'react';
import Tab from './Tab';
import PersonCard from './PersonCard';

const TabsWithCards = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        { id: "tab1", label: "Вован" },
        { id: "tab2", label: "Вован" },
        { id: "tab3", label: "Вован" },
        { id: "tab4", label: "Вован" },
        { id: "tab5", label: "Вован" },
        { id: "tab6", label: "Вован" },
        { id: "tab7", label: "Вован" },
        { id: "tab8", label: "Вован" },
        { id: "tab9", label: "Вован" },
        { id: "tab10", label: "Вован" },
        { id: "tab11", label: "Вован" },
        { id: "tab12", label: "Вован" },
    ];

    const data = {
        tab1: [
            { id: 1, category: "Фобия", title: "Нарушение закона" },
            { id: 2, category: "Фобия", title: "Мексиканская" },
        ],
        tab2: [
            { id: 3, category: "Фобия", title: "Боязнь темноты" },
            { id: 4, category: "Фобия", title: "Гоооооон" },
        ],
        tab3: [
            { id: 5, category: "Фобия", title: "Боязнь темноты" },
            { id: 6, category: "Фобия", title: "Гоооооон" },
        ],
    };

    return (
        <>
        <div className='tabs-wrapper'>
            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                />
                ))}
        </div>

        <div className='personCard-wrapper'>
            {data[activeTab].map((card) => (
            <PersonCard key={card.id} category={card.category} title={card.title} />
            ))}
        </div>
        </>
  );
};

export default TabsWithCards;