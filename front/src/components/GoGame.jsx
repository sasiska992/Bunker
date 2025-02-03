import React from 'react';
import Logo from './modules/Logo';
import TabsWithCards from './modules/TabsWithCards';
import MyCards from './modules/MyCards';

const GoGame = ({value, onChange}) => {
    const handlePrev = () => {
        value = 3;
        onChange(value);
    }
    return (
        <section className="game">
            <div className="cards">
                <img src="./img/historyImg.jpg" alt="image" className='section-img'/>
                <Logo/>
                <div className="section-h2">Карточки игрока</div>
                <div className="darkFon">
                    <MyCards />
                </div>
                <button onClick={handlePrev} className="prev">
                    <img src="./img/arrow.svg" alt="next" />
                </button>
                <a href="#continue" className="Down">
                    <img src="./img/down.png" alt="icon" />
                </a>
                <a href="#continue" className="down"></a>
            </div>
            <div className="sequel" id='continue'>
                В кругу люди начали обсуждать, кто из них должен войти в бункер. Каждый из них был полон надежды, но и страха — страха быть отвергнутым, страха потерять шанс на спасение. Я стоял в стороне, прислушиваясь к их голосам, и чувствовал, как напряжение нарастает. <br />
                Вдруг один из них, высокий мужчина с усталым лицом, поднял голос: "Мы не можем просто выбрать, кто достоин. Каждый из нас имеет право на жизнь!" Его слова вызвали одобрительные кивки, но в глазах других читалась тревога. <br />
                Я понимал, что время на исходе. За пределами лагеря слышались глухие звуки катастрофы, и каждый миг мог стать последним. Внезапно кто-то из толпы закричал: "Смотрите!" — и все обернулись. Вдалеке, среди облаков пыли и хаоса, показались силуэты. Это были другие выжившие, но с ними шли и те, кто не искал спасения, а лишь жаждал власти и контроля. <br />
                Ситуация накалилась до предела. Я знал, что выбор, который нам предстояло сделать, определит не только нашу судьбу, но и судьбу всего человечества. В этот момент я понял: в бункере не только искали спасение, но и формировалась новая реальность, где каждый шаг мог стать решающим.
            </div>
            <div className="tabs-cards">
                <img src="./img/tabsImg.png" alt="image" className='section-img'/>
                <TabsWithCards/>
            </div>
        </section>
    );
};

export default GoGame;