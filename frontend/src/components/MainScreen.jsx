import React, { useState } from 'react';
import Logo from './modules/Logo';

const MainScreen = ({ onChange, onCreateRoom }) => {
    const [loading, setLoading] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const [roomId, setRoomId] = useState(null);

    const handleJoin = async () => {
        if (!roomCode.trim()) {
            alert('Введите код комнаты');
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/rooms/join/?room_id=${roomCode}`, {
                method: 'POST'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to join room');
            }
            
            const data = await response.json();
            setRoomId(roomCode); // Сохраняем roomId в состоянии
            window.history.pushState({}, '', `?invite=${roomCode}`);
            onChange(3); // Переходим к экрану ожидания
        } catch (error) {
            alert(error.message);
            console.error('Join room failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='mainScreen'>
            <img src="./img/mainImg.jpg" alt="image" className='section-img'/>
            <Logo/>
            <div className="mainScreen-wrapper">
                <div className="join">
                    <input 
                        type="text" 
                        className="txt" 
                        placeholder='Введите код комнаты'
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <div className="line"></div>
                    <button 
                        onClick={handleJoin} 
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? 'Подключение...' : 'Присоединиться'}
                    </button>
                </div>
                <div className="scull">
                    <img src="./img/scull.svg" alt="scull" />
                    Cheat to survive
                </div>
                <div className="create">
                    <button onClick={onCreateRoom} className="btn">
                        Создать комнату
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainScreen;