import React from 'react';

const MainScreen = () => {
    return (
        <section className='mainScreen'>
            <div className="logo">
                Бункер
                <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
            </div>

            <div className="mainScreen-wrapper">
                <div className="join">
                    <input type="text" className="txt" placeholder='Введите код комнаты'/>
                    <div className="line"></div>
                    <button className="btn">Присоединиться</button>
                </div>
                <div className="scull">
                    <img src="./img/scull.svg" alt="scull" />
                    Cheat to survive
                </div>
                <div className="create">
                    <button className="btn">Создать комнату</button>
                </div>
            </div>
        </section>
    );
};

export default MainScreen;