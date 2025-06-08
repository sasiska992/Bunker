import React, { useEffect, useRef, useState } from 'react';
import Tab from './Tab';
import PersonCard from './PersonCard';

const TabsWithCards = ({ myCards, otherPlayers }) => {
  const [activeTab, setActiveTab] = useState("tab0");
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  const tabs = [{ id: "tab0", label: "Вы" }, ...otherPlayers.map((_, index) => ({
    id: `tab${index + 1}`,
    label: `Игрок ${index + 1}`
  }))];

  const getTabCards = () => {
    if (activeTab === "tab0") return myCards;
    const index = parseInt(activeTab.replace("tab", ""), 10) - 1;
    return otherPlayers[index] || [];
  };

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.offsetHeight;
      setContentHeight(newHeight);
    }
  }, [activeTab]);

  return (
    <>
      <div className="tabs-wrapper">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
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
          {getTabCards().map((card, index) => (
            <PersonCard
              key={`${card.category}-${index}`}
              category={card.category}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TabsWithCards;
