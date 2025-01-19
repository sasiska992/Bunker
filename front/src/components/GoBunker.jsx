import React from 'react';
import Logo from './modules/Logo';

const GoBunker = ({value, onChange}) => {
    const handleNext = () => {
        value = 4;
        onChange(value);
    }
    const handlePrev = () => {
        value = 2;
        onChange(value);
    }
    return (
        <section className="bunker">
        <img src="./img/historyImg.jpg" alt="image" className='section-img'/>
        <Logo/>
        <div className="section-h2">Проклятый подвал</div>
        <div className="darkFon darkFon15">
            <div className="descr">
                Один из городских подвалов, мы даже не знаем что за здание над ним, но  кажется здесь что то не так, как то не дружелюбно здесь, не покидает  ощущение что здесь кто то есть. Ладно, сейчас нет времени решать, надо  оставаться, но поместятся не все.
            </div>
        </div>
        <div className="darkFon">
            <div className="darkFon-wrapper">
                <div className="details">
                    <div className="inform">
                        <img src="./img/inform.svg" alt="icon" />
                        - До отключения установок 5 лет. <br />
                        - Велик шанс быть зомбированным на поверхности. <br />
                        - Ресурсы достать сложно.
                    </div>
                    <div className="inform">
                        <img src="./img/equipment.svg" alt="icon" />
                        Убежище оборудовано: <br />
                        - Трансформаторная комната и аварийная динамо-машина. <br />
                        - Старый и ржавый санузел. <br />
                        - Комната с пентаграммами и атрибутикой культа. <br />
                    </div>
                </div>
                <img src="./img/radiation.svg" alt="icon" className='radiation' />
                <div className="points">
                    <div className="clarification">
                        <img src="./img/live.svg" alt="icon" />
                        <div className="">
                            В бункере живёт <br />
                            Димон
                        </div>
                    </div>
                    <div className="clarification">
                        <img src="./img/size.svg" alt="icon"  style={{width: 55}}/>
                        <div className="">
                            Размер бункера <br />
                            100м
                        </div>
                    </div>
                    <div className="clarification">
                        <img src="./img/food.svg" alt="icon" />
                        <div className="">
                            Запас еды <br />
                            10 лет 10 месяцев
                        </div>
                    </div>
                </div>
            </div>
            <div className="sites">Количество мест: 5</div>
        </div>

        <button onClick={handlePrev} className="prev">
            <img src="./img/arrow.svg" alt="next" />
        </button>

        <button onClick={handleNext} className="next">
            <img src="./img/arrow.svg" alt="next" />
        </button>
    </section>
    );
};

export default GoBunker;