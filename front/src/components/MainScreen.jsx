import React, { useEffect, useState } from 'react';
import Logo from './modules/Logo'

const MainScreen = ({value, onChange}) => {
    const [loading, setLoading] = useState(true);
        useEffect(() => {
            setLoading(false);
    }, []);
    const handleclick = () => {
        value = 2;
        onChange(value);
    }
    const handlewaiting = () => {
        value = 3;
        onChange(value);
    }
    return (
        <>
            {loading ? "" :
            <section className='mainScreen'>
                <img src="./img/mainImg.jpg" alt="image" className='section-img'/>
                <Logo/>
                <div className="mainScreen-wrapper">
                    <div className="join">
                        <input type="text" className="txt" placeholder='Введите код комнаты'/>
                        <div className="line"></div>
                        <button onClick={handlewaiting} className="btn">Присоединиться</button>
                    </div>
                    <div className="scull">
                        <img src="./img/scull.svg" alt="scull" />
                        Cheat to survive
                    </div>
                    <div className="create">
                        <button onClick={handleclick} className="btn">Создать комнату</button>
                    </div>
                </div>
            </section>}
        </>
    );
};

export default MainScreen;