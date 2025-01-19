import React from 'react';
import Logo from './modules/Logo';

const GoCatastrophe = ({value, onChange}) => {
    const handleNext = () => {
        value = 3;
        onChange(value);
    }
    const handlePrev = () => {
        value = 1;
        onChange(value);
    }
    return (
        <section className="catastrophe">
        <img src="./img/historyImg.jpg" alt="image" className='section-img'/>
        <Logo/>
        <div className="section-h2">Катастрофа</div>
        <div className="darkFon">
            <div className="darkFon-h2">«Выжигатель мозгов»</div>
            <div className="darkFon-wrapper">
                <div className="txt">
                    Ещё несколько лет назад государство начало строить различные вышки и  установки. Никто не знал зачем они, но мы знали… Нас обо всём  предупредили за несколько часов до начала их функционирования. Мы успели укрыться под бетонным укрытием и смастерить себе что-то по типу защиты  для головы. На улице уже начинают ходить люди-зомби, которые делают всё что им скажут.
                </div>
                <div className="details">
                    <div className="clarification">
                        <img src="./img/time.svg" alt="icon" />
                        До решения загадки аномальных полей учеными 9 лет.
                    </div>
                    <div className="inform">
                        <img src="./img/inform.svg" alt="icon" />
                        - Вне убежища происходят странные вещи: телепортации, исчезновения, перемещения, получение повреждений и так далее. <br />
                        - Электроника часто ведёт себя не нормально и отключается.
                    </div>
                </div>
            </div>
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

export default GoCatastrophe;