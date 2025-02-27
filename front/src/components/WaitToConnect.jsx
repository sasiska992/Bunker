import React, { useEffect, useRef, useState } from 'react';

const WaitToConnect = ({value, onChange}) => {
    const [loading, setLoading] = useState(true);
    const [playersCount, setPlayersCount] = useState(0); //состояния для подключенных игроков
    const socketRef = useRef(null);
    useEffect(() => {
          setLoading(false);

          const socket = new WebSocket('wss://your-websocket-server-url'); // Замените на ваш URL
        socketRef.current = socket;

        // Обработчик открытия соединения
        socket.onopen = () => {
            console.log('WebSocket подключен');
            // Здесь можно отправить начальные данные, например, ID комнаты
            socket.send(JSON.stringify({ roomId: '1a2b3c4d5', action: 'join' })); // Пример
        };

          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'playersUpdate') {
                setPlayersCount(message.count); // Обновляем количество игроков
            }
        };
    }, []);
    
    const handleclick = () => {
        value = 1;
        onChange(value);
    }

    const linkRef = useRef(null);
    const [check, setCheck] = useState(false);

    const handleCopyClick = async () => {
        if (linkRef.current) {
        const textToCopy = linkRef.current.textContent.trim();
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.error('Не удалось скопировать текст: ', err);
        }
        }
        setCheck(true); 
    };
    return (
        <>
            {loading ? "" :
                <section className='connect'>
                    <img src="./img/connectionImg.jpeg" alt="image" className='section-img'/>
                    <div className="logo">
                        Бункер
                        <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
                    </div>

                    <h2 className="section-h2">Ожидание игроков</h2>

                    <div className="darkFon connect-info">
                        <h2>Пригласите пользователя по ссылке ниже</h2>
                        <div className="link" ref={linkRef}>
                            Бункер-ёпта?invite=1a2b3c4d5
                            <img src="./img/copy.svg" alt="copy" onClick={handleCopyClick} className={!check ? "copy" : "copy copy-active"}/>
                            <div onClick={handleCopyClick} className={!check ? "checkmark" : "checkmark checkmark-active"}></div>
                        </div>
                        <div className="people">Присоединилось {playersCount} 6 / 12</div>
                        <div className="waiting">Дождитесь начала игры</div>
                    </div>

                    <button onClick={handleclick} className="return">
                        <img src="./img/return.svg" alt="return" />
                    </button>
                    <button className="info">
                        <img src="./img/info.svg" alt="info" />
                    </button>
                </section>}
        </>
    );
};

export default WaitToConnect;