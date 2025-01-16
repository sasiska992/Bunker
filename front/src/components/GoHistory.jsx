import React, { useEffect, useState } from "react";
import axios from "axios";

function GoHistory() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
      });
  }, []);


  if (!data) {
    console.log("Данные не получены");
    console.log(data);
    return <div>Loading...</div>
  }
  else
  return (
    <div>
      <h1>Описание Бункера</h1>
      <h2>Катастрофа</h2>
      <p><strong>Название:</strong> {data.bunker_description.catastrophe.catastrophe_title}</p>
      <p><strong>Описание:</strong> {data.bunker_description.catastrophe.catastrophe_description}</p>
      <p><strong>Время проживания:</strong> {data.bunker_description.catastrophe.residence_time}</p>

      <h2>Бункер</h2>
      <p><strong>Название:</strong> {data.bunker_description.bunker.bunker_title}</p>
      <p><strong>Описание:</strong> {data.bunker_description.bunker.bunker_description}</p>
      <p><strong>Размер:</strong> {data.bunker_description.bunker.size} м²</p>
      <p><strong>Количество мест:</strong> {data.bunker_description.bunker.number_of_seats}</p>

      <h2>Игроки</h2>
      {data.player_cards.map((player, index) => (
        <div key={index}>
          <h3>Игрок {index + 1}</h3>
          <pre>{JSON.stringify(player, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

export default GoHistory;