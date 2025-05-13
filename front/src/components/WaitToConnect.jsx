import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

const WaitToConnect = ({ value, onChange, roomId }) => {
    const [playersCount, setPlayersCount] = useState(1);
    const [maxPlayers, setMaxPlayers] = useState(12);
    
    const { socketRef } = useWebSocket(roomId, (data) => {
        if (data.type === 'roomState') {
            setPlayersCount(data.count);
        }
    });

    useEffect(() => {
        let urlRoomId = ''
        if (!roomId) {
            // Если roomId нет, пробуем извлечь из URL
            const urlParams = new URLSearchParams(window.location.search);
            urlRoomId = urlParams.get('invite');
            if (urlRoomId) {
                console.log("Using roomId from URL:", urlRoomId);
                // Можно обновить состояние или перенаправить
            } else {
                console.error("No roomId provided!");
                // Перенаправляем на главную
                onChange(1);
            }
        }

        const ws = new WebSocket(`ws://localhost:8000/ws/room/${urlRoomId}?user_id=${crypto.randomUUID()}`);
        
        ws.onopen = () => {
            console.log("WS connected!");
        };
    
        ws.onmessage = (e) => {
            console.log("WS message:", e.data);
            const data = JSON.parse(e.data);
            if (data.type === 'roomState') {
                setPlayersCount(data.count);
            }
        };
    
        return () => ws.close();
    }, [roomId]);

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

    const [check, setCheck] = useState(false);

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
                <div className="waiting">Дождитесь начала игры</div>
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

export default WaitToConnect;