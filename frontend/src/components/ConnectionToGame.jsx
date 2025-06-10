import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';

const ConnectionToGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState(1);
  const [allUsers, setAllUsers] = useState([])
  const [check, setCheck] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false); 
  const maxPlayers = 12;

  const socketRef = useWebSocket(roomId, (data) => {
    if (data.type === 'roomState') setPlayers(data.count);
  });

  const handleStart = async () => {
    try {
      // 1. Получаем ID всех игроков
      const allUsers = await new Promise((resolve) => {
        socketRef.current.send(JSON.stringify({ type: 'getAllIds' }));
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'sendAllIds') {
            socketRef.current.onmessage = null;
            resolve(data.ids);
          }
        };
        socketRef.current.onmessage = handler;
      });
  
      // 2. Подготавливаем комнату
      await fetch(`http://127.0.0.1:8000/prepare_room?room_id=${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_ids: allUsers })
      });
  
      const delay = async () => {
        setTimeout(() => {

        }, 1000)
      }
      // 3. Отправляем команду ВСЕМ игрокам
      socketRef.current.send(JSON.stringify({
        type: 'startGame',
        roomId
      }));
  
      // 4. Переходим в игру
      navigate(`/game/${roomId}`);
  
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleLeave = () => {
    navigate('/');
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
      <img src="/img/connectionImg.jpeg" alt="image" className='section-img'/>
      <div className="logo">Бункер <img src="/img/bunkerLogo.svg" alt="bunkerIcon" /></div>
      <h2 className="section-h2">Ожидание игроков</h2>
      <div className="darkFon connect-info">
        <h2>Пригласите пользователя по ссылке ниже</h2>
        <div className="link">
          {roomId}
          <img src="/img/copy.svg" alt="copy" onClick={handleCopyClick} className={!check ? "copy" : "copy copy-active"} />
          <div onClick={handleCopyClick} className={!check ? "checkmark" : "checkmark checkmark-active"}></div>
        </div>
        <div className="people">Присоединилось {players} / {maxPlayers}</div>
        <button onClick={handleStart} className="start" disabled={players < 2}>Начать игру</button>
      </div>
      <button onClick={handleLeave} className="return">
        <img src="/img/return.svg" alt="return" />
      </button>
    </section>
  );
};

export default ConnectionToGame;
