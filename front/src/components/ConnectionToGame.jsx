import React, { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

const ConnectionToGame = ({ onChange, roomId }) => {
    const [playersCount, setPlayersCount] = useState(1);
    const [maxPlayers] = useState(12);
    const [check, setCheck] = useState(false);
    
    // Используем кастомный хук для WebSocket (единственное соединение)
    const { socketRef } = useWebSocket(roomId, (data) => {
        if (data.type === 'roomState') {
            setPlayersCount(data.count);
        }
    });

    const handleStartGame = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                action: 'startGame',
                roomId: roomId
            }));
            onChange(4); // Переход к игре
        }
    };

    const handleDisconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
        }
        onChange(1); // Возврат на предыдущий экран
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCheck(true);
        } catch (err) {
            console.error('Не удалось скопировать текст: ', err);
        }
    };

    return (
        <section className='connect'>
            <img src="./img/connectionImg.jpeg" alt="image" className='section-img'/>
            <div className="logo">
                Бункер
                <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
            </div>

            <h2 className="section-h2">Ожидание игроков</h2>

            <div className="darkFon connect-info">
                <h2>Пригласите пользователя по ссылке ниже</h2>
                <div className="link">
                    {window.location.href}
                    <img 
                        src="./img/copy.svg" 
                        alt="copy" 
                        onClick={handleCopyClick} 
                        className={!check ? "copy" : "copy copy-active"}
                    />
                    <div 
                        onClick={handleCopyClick} 
                        className={!check ? "checkmark" : "checkmark checkmark-active"}
                    ></div>
                </div>
                <div className="people">Присоединилось {playersCount} / {maxPlayers}</div>
                <button 
                    onClick={handleStartGame} 
                    className="start"
                    disabled={playersCount < 2}
                >
                    Начать игру
                </button>
            </div>

            <button onClick={handleDisconnect} className="return">
                <img src="./img/return.svg" alt="return" />
            </button>
            <button className="info">
                <img src="./img/info.svg" alt="info" />
            </button>
        </section>
    );
};

export default ConnectionToGame;