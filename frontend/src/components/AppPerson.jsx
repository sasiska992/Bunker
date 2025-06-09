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

  // useEffect(() => {
  //   if (error) {
  //     const timeout = setTimeout(() => {
  //       window.location.reload();
  //     }, 12000);
  
  //     return () => clearTimeout(timeout);
  //   }
  // }, [error]);

  useEffect(() => {
    const fetchWorldData = async () => {
      try {
        const [catastropheRes, bunkerRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/catastrophe_info?room_id=${roomId}`),
          fetch(`http://127.0.0.1:8000/bunker_info?room_id=${roomId}`)
        ]);

        if (!catastropheRes.ok || !bunkerRes.ok) {
          throw new Error("Ошибка при получении данных о мире");
        }

        const catastropheJson = await catastropheRes.json();
        const bunkerJson = await bunkerRes.json();

        setCatastropheData(catastropheJson);
        setBunkerData(bunkerJson);
        setLoading(false);

      } catch (e) {
        console.error("Ошибка при загрузке катастрофы/бункера:", e);
        setError(e);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchWorldData();
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [roomId]);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/create_ai_player_cards?room_id=${roomId}`);
        const data = await response.json();
        const fullCard = { ...data, user_id: myUserId };
        setRes(fullCard);

        socketRef.current?.send(JSON.stringify({
          type: "playerReady",
          data: fullCard
        }));
      } catch (err) {
        console.error("Ошибка при получении карточки игрока:", err);
      }
    };

    fetchPlayer();
  }, []);

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