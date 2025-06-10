import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";
import GoBunker from "./GoBunker";
import GoGame from "./GoGame";
import PreLoader from "./modules/PreLoader";
import Error from "./modules/Error";
import { useWebSocket } from "./hooks/useWebSocket";

const AppPerson = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [block, setBlock] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [catastropheData, setCatastropheData] = useState(null);
  const [bunkerData, setBunkerData] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [playersCards, setPlayersCards] = useState([]);
  const [allPlayers, setAllPlayers] = useState([])

  const socketRef = useWebSocket(roomId, (data) => {
    if (data.type === "playersCards" && Array.isArray(data.cards)) {
      setPlayersCards(data.cards || []);
      const allUserIds = [
        playerCard?.user_id,
        ...data.cards.map(card => card.user_id)
      ];
      const uniqueUserIds = [...new Set(allUserIds)];
      setAllPlayers(uniqueUserIds); 
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const user_id = localStorage.getItem('user_id');
        if (!user_id) throw new Error("User ID not found");

        // 1. Загрузка данных о катастрофе
        const catastropheRes = await fetch(`http://127.0.0.1:8000/catastrophe_info?room_id=${roomId}`);
        if (!catastropheRes.ok) throw new Error("Failed to load catastrophe data");
        const catastropheJson = await catastropheRes.json();
        setCatastropheData(catastropheJson);

        // 2. Загрузка данных о бункере
        const bunkerRes = await fetch(`http://127.0.0.1:8000/bunker_info?room_id=${roomId}`);
        if (!bunkerRes.ok) throw new Error("Failed to load bunker data");
        const bunkerJson = await bunkerRes.json();
        setBunkerData(bunkerJson);

        // 3. Загрузка карточки игрока
        const playerRes = await fetch(`http://127.0.0.1:8000/create_ai_player_card?room_id=${roomId}&user_id=${user_id}`);
        if (!playerRes.ok) throw new Error("Failed to load player card");
        let playerData = await playerRes.json();
        playerData = playerData.result
        
        const fullCard = { ...playerData, user_id };
        setPlayerCard(fullCard);

        // 4. Отправка данных через WebSocket
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({
            type: "playerReady",
            data: fullCard
          }));
        } else {
          console.warn("WebSocket connection not ready");
        }

      } catch (err) {
        console.error("Data loading error:", err);
        setError(err.message || "Failed to load game data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [roomId]);


  console.log(allPlayers.slice(1, ))

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={() => window.location.reload()}
        onExit={() => navigate("/")}
      />
    );
  }

  if (loading || !catastropheData || !bunkerData || !playerCard) {
    return <PreLoader />;
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
          res={playerCard}
          others={playersCards}
        />
      )}
    </>
  );
};

export default AppPerson;