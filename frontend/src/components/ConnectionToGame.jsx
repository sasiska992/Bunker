import React, { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

const ConnectionToGame = ({ roomId, onStartGame, onLeave }) => {
    const [players, setPlayers] = useState(1);
    const [check, setCheck] = useState(false)
    const maxPlayers = 12;

    const socketRef = useWebSocket(roomId, (data) => {
        if (data.type === 'roomState') setPlayers(data.count);
    });

    const handleStart = () => {
        socketRef.current.send(JSON.stringify({ type: 'startGame' }));
        onStartGame();
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
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
                    {roomId}
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
                <div className="people">Присоединилось {players} / {maxPlayers}</div>
                <button 
                    onClick={handleStart} 
                    className="start"
                    disabled={players < 2}
                >
                    Начать игру
                </button>
            </div>

            <button onClick={onLeave} className="return">
                <img src="./img/return.svg" alt="return" />
            </button>
            <button className="info">
                <img src="./img/info.svg" alt="info" />
            </button>
        </section>
    );
};

export default ConnectionToGame;