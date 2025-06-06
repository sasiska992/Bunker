import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";
import GoBunker from "./GoBunker";
import GoGame from "./GoGame";
import PreLoader from "./modules/PreLoader";
import Error from "./modules/Error";

const AppPerson = () => {
  const { roomId } = useParams();
  const [block, setBlock] = useState(1);
  const [catastropheData, setCatastropheData] = useState(null);
  const [bunkerData, setBunkerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [res, setRes] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_start_info');
        const jsonData = await response.json();
        if (jsonData && jsonData.catastrophe && jsonData.bunker) {
          setCatastropheData(jsonData.catastrophe);
          setBunkerData(jsonData.bunker);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setCatastropheData(null);
        setBunkerData(null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/create_ai_player_cards');
        const data = await response.json();
        setRes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCards();
  }, []);

  if (loading)
    return <PreLoader />;

  if (error) {
    return <Error />;
  }

  return (
    <>
      {block === 1 && <GoHistory value={block} onChange={setBlock} />}
      {block === 2 && <GoCatastrophe value={block} onChange={setBlock} catastropheData={catastropheData} />}
      {block === 3 && <GoBunker value={block} onChange={setBlock} bunkerData={bunkerData} />}
      {block === 4 && <GoGame value={block} onChange={setBlock} res={res} />}
    </>
  );
};

export default AppPerson;
