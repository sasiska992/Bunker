import React, { useEffect, useRef, useState } from 'react';
import Tab from './Tab';
import PersonCard from './PersonCard';
import PersonReverseCard from './PersonReverseCard';

const TabsWithCards = ({ otherPlayers, socketRef }) => {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  const getProfession = (cards) => {
    const profCard = cards.find(card => card.category === "Профессия");
    if (!profCard || !profCard.title) return "Игрок";
    return profCard.title.split(" ")[0].replace(/[,.:;]/g, '');
  };

  const tabs = otherPlayers.map((playerCards, index) => ({
    id: index,
    label: getProfession(playerCards),
    cards: playerCards
  }));

  const currentCards = tabs[activeTab]?.cards || [];

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [activeTab]);

  return (
    <>
      <div className="tabs-wrapper">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <div
        className="personCard-wrapper"
        style={{
          height: `${contentHeight}px`,
          transition: 'height 0.3s ease',
        }}
      >
        <div className="darkFon" ref={contentRef}>
          {currentCards.map((card, index) => (
            <PersonReverseCard
              key={`${card.category}-${index}`}
              category={card.category}
              title={card.title}
              child={1}
              cardId={`${activeTab}${index}`}
              activeTab={`${activeTab}`}
              socketRef={socketRef}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TabsWithCards;