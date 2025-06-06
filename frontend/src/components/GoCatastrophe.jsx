import React, { useEffect, useState } from 'react';
import Logo from './modules/Logo';

const GoCatastrophe = ({value, onChange, catastropheData}) => {

    const handleNext = () => {
        value = 3;
        onChange(value);
    }
    const handlePrev = () => {
        value = 1;
        onChange(value);
    }

    if (!catastropheData) {
        return <div>Error</div>
    }

    return (
        <section className="catastrophe">
        <img src="/img/historyImg.jpg" alt="image" className='section-img'/>
        <Logo/>
        <div className="section-h2">Катастрофа</div>
        <div className="darkFon">
            <div className="darkFon-h2">«{catastropheData.catastrophe_title}»</div>
            <div className="darkFon-wrapper">
                <div className="txt">
                    {catastropheData.catastrophe_description}
                </div>
                <div className="details">
                    <div className="clarification">
                        <img src="/img/time.svg" alt="icon" />
                        Время до решения: <br /> {catastropheData.residence_time}
                    </div>
                    <div className="inform">
                        <img src="/img/inform.svg" alt="icon" />
                        {catastropheData.additional_information && catastropheData.additional_information.map((info, index) => (
                            <React.Fragment key={index}>
                                - {info} <br />
                            </React.Fragment>
                        ))}
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

export default GoCatastrophe;