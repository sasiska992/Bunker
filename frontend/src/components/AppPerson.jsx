import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";
import GoBunker from "./GoBunker";
import GoGame from "./GoGame";
import PreLoader from "./modules/PreLoader";
import Error from "./modules/Error";
import { useWebSocket } from "./hooks/useWebSocket";

const AppPerson = () => {
  const { roomId } = useParams();
  const [block, setBlock] = useState(1);

  const [catastropheData, setCatastropheData] = useState(null);
  const [bunkerData, setBunkerData] = useState(null);
  const [res, setRes] = useState(null);
  const [playersCards, setPlayersCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const myUserId = localStorage.getItem("user_id");

  const socketRef = useWebSocket(roomId, (data) => {
    if (data.type === "playersCards") {
      const others = data.cards.filter((card) => card.user_id !== myUserId);
      setPlayersCards(others);
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Шаг 1: Загрузка катастрофы
        const catastropheRes = await fetch(`http://127.0.0.1:8000/catastrophe_info?room_id=${roomId}`);
        if (!catastropheRes.ok) throw new Error("Ошибка при получении данных о катастрофе");
        const catastropheJson = await catastropheRes.json();
        setCatastropheData(catastropheJson);

        // Шаг 2: Загрузка бункера
        const bunkerRes = await fetch(`http://127.0.0.1:8000/bunker_info?room_id=${roomId}`);
        if (!bunkerRes.ok) throw new Error("Ошибка при получении данных о бункере");
        const bunkerJson = await bunkerRes.json();
        setBunkerData(bunkerJson);


        const [playerRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/create_ai_player_cards?room_id=${roomId}`),
        ]);

        if (!playerRes.ok) throw new Error("Ошибка при получении карточки игрока");

        const playerData = await playerRes.json();
        const fullCard = { ...playerData, user_id: myUserId };
        setRes(fullCard);

        socketRef.current?.send(JSON.stringify({
          type: "playerReady",
          data: fullCard
        }));

        setLoading(false);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError(err);
        setLoading(false);
      }
    };

    // const timeoutId = setTimeout(loadData, 12000); // Задержка 12 секунд
    const timeoutId = setTimeout(loadData, 1); // Какая-то загрузка

    return () => clearTimeout(timeoutId);
  }, [roomId]);

  if (loading || !catastropheData || !bunkerData) {
    return <PreLoader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {block === 1 && <GoHistory value={block} onChange={setBlock} />}
      {block === 2 && (
        <GoCatastrophe
          value={block}
          onChange={setBlock}
          catastropheData={catastropheData}
        />
      )}
      {block === 3 && (
        <GoBunker
          value={block}
          onChange={setBlock}
          bunkerData={bunkerData}
        />
      )}
      {block === 4 && (
        <GoGame
          value={block}
          onChange={setBlock}
          res={res}
          others={playersCards}
        />
      )}
    </>
  );
};

export default AppPerson;