import React from 'react';
import Logo from './modules/Logo';
import PreLoader from './modules/PreLoader';

const GoBunker = ({value, onChange, bunkerData}) => {

    const renderBlocks = () => {
        return Array.from({ length: bunkerData.number_of_seats }, (_, index) => (
            <div key={index} className="site-wrap"><img src="/img/wheel-chair.png" alt="site" /></div>
        ));
    };
    const handleNext = () => {
        value = 4;
        onChange(value);
    }
    const handlePrev = () => {
        value = 2;
        onChange(value);
    }
    if(!bunkerData)
        return <div>Error</div>

    return (
        <section className="bunker">
        <img src="/img/historyImg.jpg" alt="image" className='section-img'/>
        <Logo/>
        <div className="section-h2">{bunkerData.bunker_title}</div>
        <div className="darkFon darkFon15">
            <div className="descr">
                {bunkerData.bunker_description}
            </div>
        </div>
        <div className="darkFon">
            <div className="darkFon-wrapper">
                <div className="details">
                    <div className="inform">
                        <img src="/img/inform.svg" alt="icon" />
                        {bunkerData.additional_information && bunkerData.additional_information.map((info, index) => (
                            <React.Fragment key={index}>
                                - {info} <br />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="inform">
                        <img src="/img/equipment.svg" alt="icon" />
                        {bunkerData.tools && bunkerData.tools.map((info, index) => (
                            <React.Fragment key={index}>
                                - {info} <br />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <img src="/img/radiation.svg" alt="icon" className='radiation' />
                <div className="points">
                    <div className="clarification">
                        <img src="/img/chair.png" alt="icon" />
                        <div className="chairs">
                            Количество мест <br />
                            <div className="kol">
                                {renderBlocks()}
                            </div>
                        </div>
                    </div>
                    <div className="clarification">
                        <img src="/img/size.svg" alt="icon"  style={{width: 55}}/>
                        <div className="">
                            Размер бункера <br />
                            {bunkerData.size}м
                        </div>
                    </div>
                    <div className="clarification">
                        <img src="/img/food.svg" alt="icon" />
                        <div className="">
                            Запас еды <br />
                            10 лет 10 месяцев
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button onClick={handlePrev} className="prev">
            <img src="/img/arrow.svg" alt="next" />
        </button>

        <button onClick={handleNext} className="next">
            <img src="/img/arrow.svg" alt="next" />
        </button>
    </section>
    );
};

export default GoBunker;