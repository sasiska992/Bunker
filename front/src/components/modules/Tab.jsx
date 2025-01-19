import React from 'react';

const Tab = ({label, isActive, onClick}) => {
    return (
        <button className={isActive ? "tab tab-active" : "tab"} onClick={onClick}>
            {label}
        </button>
    );
};

export default Tab;