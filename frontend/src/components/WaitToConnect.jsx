import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';

const WaitToConnect = () => {
  const { roomId } = useParams();
  const [check, setCheck] = useState(false);
  const [players, setPlayers] = useState(1);
  const maxPlayers = 12;
  const navigate = useNavigate();

  const socketRef = useWebSocket(roomId, (data) => {
    if (data.type === 'roomState') setPlayers(data.count);
    if (data.type === 'startGame') navigate(`/game/${roomId}`);
  });

  const handleLeave = () => {
    navigate('/');
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
        <div className="waiting">Дождитесь начала игры</div>
      </div>
      <button onClick={handleLeave} className="return">
        <img src="/img/return.svg" alt="return" />
      </button>
    </section>
  );
};

export default WaitToConnect;
