import React, { useEffect, useState } from 'react';
import Logo from './modules/Logo';
import TabsWithCards from './modules/TabsWithCards';
import MyCards from './modules/MyCards';
import PreLoader from './modules/PreLoader';
import Error from './modules/Error';
import { useWebSocket } from './hooks/useWebSocket';
import { useParams } from 'react-router-dom';

const formatCards = (data) => {
  return [
    { category: "Пол", title: data.sex },
    { category: "Возраст", title: data.age },
    { category: "Здоровье", title: data.health },
    { category: "Профессия", title: data.profession },
    { category: "Инвентарь", title: data.inventory },
    { category: "Фобия", title: data.phobia },
    { category: "Хобби", title: data.hobby },
    { category: "Нарушение закона", title: data.violation_of_law },
    { category: "Доп. информация", title: data.additional_information },
    { category: "Вредная привычка", title: data.bad_habits },
    { category: "Опыт", title: data.work_experience },
    { category: "Последствия катастрофы", title: data.impact_of_disaster },
  ];
};

const GoGame = ({ onChange, res, others }) => {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const {roomId} = useParams()
  const socketRef = useWebSocket(roomId, (data) => {
    if (data.type === "playersCards") {
    }
  });

  useEffect(() => {
    if (res !== undefined) {
      setLoading(false);
      setShowError(false);
    } else {
      const timeout = setTimeout(() => {
        setLoading(false);
        setShowError(true);
      }, 20000);
      return () => clearTimeout(timeout);
    }
  }, [res]);

  const handlePrev = () => {
    onChange(3);
  };

  if (loading) return <PreLoader />;
  if (showError || !res || Object.keys(res).length === 0 || res.detail) return <Error />;

  return (
    <>
      <section className="game">
        <div className="cards">
          <img src="/img/historyImg.jpg" alt="image" className="section-img" />
          <Logo />
          <div className="section-h2">Карточки игрока</div>
          <div className="darkFon">
            <MyCards socketRef={socketRef} res={res} />
          </div>
          <button onClick={handlePrev} className="prev">
            <img src="/img/arrow.svg" alt="prev" />
          </button>
          <a href="#continue" className="Down">
            <img src="/img/down.png" alt="icon" />
          </a>
        </div>

        <div className="sequel" id="continue">
            В кругу люди начали обсуждать, кто из них должен войти в бункер. Каждый из них был полон надежды, но и страха — страха быть отвергнутым, страха потерять шанс на спасение. Я стоял в стороне, прислушиваясь к их голосам, и чувствовал, как напряжение нарастает. <br />
            Вдруг один из них, высокий мужчина с усталым лицом, поднял голос: "Мы не можем просто выбрать, кто достоин. Каждый из нас имеет право на жизнь!" Его слова вызвали одобрительные кивки, но в глазах других читалась тревога. <br />
            Я понимал, что время на исходе. За пределами лагеря слышались глухие звуки катастрофы, и каждый миг мог стать последним. Внезапно кто-то из толпы закричал: "Смотрите!" — и все обернулись. Вдалеке, среди облаков пыли и хаоса, показались силуэты. Это были другие выжившие, но с ними шли и те, кто не искал спасения, а лишь жаждал власти и контроля. <br />
            Ситуация накалилась до предела. Я знал, что выбор, который нам предстояло сделать, определит не только нашу судьбу, но и судьбу всего человечества. В этот момент я понял: в бункере не только искали спасение, но и формировалась новая реальность, где каждый шаг мог стать решающим.
        </div>

        <div className="tabs-cards">
          <img src="/img/tabsImg.jpeg" alt="image" className="section-img" />
          <TabsWithCards socketRef={socketRef}
            otherPlayers={others.map(formatCards)}
          />
        </div>
      </section>
    </>
  );
};

export default GoGame;
