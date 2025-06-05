import React, { useState } from 'react';
import Logo from './modules/Logo';

const MainScreen = ({ onCreate, onJoin }) => {
    const [code, setCode] = useState('');

  const handleJoin = async () => {
    if (!code) return alert('Введите код комнаты');
    try {
      const res = await fetch(`http://localhost:8000/rooms/join/?room_id=${code}`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Комната не найдена или заполнена');
      const data = await res.json();
      window.history.pushState({}, '', `?invite=${data.room_id}`);
      onJoin(data.room_id);
    } catch (e) {
      alert(e.message);
    }
  };

    return (
        <section className='mainScreen'>
            <img src="./img/mainImg.jpg" alt="image" className='section-img'/>
            <Logo/>
            <div className="mainScreen-wrapper">
                <div className="join">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text" 
                        className="txt" 
                        placeholder='Введите код комнаты'
                    />
                    <div className="line"></div>
                    <button onClick={handleJoin} className="btn">Присоединиться</button>
                </div>
                <div className="scull">
                    <img src="./img/scull.svg" alt="scull" />
                    Cheat to survive
                </div>
                <div className="create">
                    <button onClick={onCreate} className="btn">
                        Создать комнату
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainScreen;