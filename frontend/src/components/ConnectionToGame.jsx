import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';

const ConnectionToGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState(1);
  const [allUsers, setAllUsers] = useState([])
  const [check, setCheck] = useState(false);
  const maxPlayers = 12;

  const socketRef = useWebSocket(roomId, (data) => {
    socketRef.current.send(JSON.stringify({ type: 'getAllIds' }));
    if (data.type === 'sendAllIds') setAllUsers(data.ids)
    if (data.type === 'roomState') setPlayers(data.count);
  });

  const handleStart = async () => {
    const prepareRoom = await fetch(`http://127.0.0.1:8000/prepare_room?room_id=${roomId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user_ids: allUsers})
    })

    socketRef.current.send(JSON.stringify({ type: 'startGame' }));
    navigate(`/game/${roomId}`);
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
