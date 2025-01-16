import React, { useEffect, useRef, useState } from 'react';

const WaitToConnect = ({value, onChange}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
          setLoading(false);
    }, []);
    
    const handleclick = () => {
        value = 1;
        onChange(value);
    }

    const linkRef = useRef(null);
    const [copy, setCopy] = useState(false);

    const handleCopyClick = async () => {
        if (linkRef.current) {
        const textToCopy = linkRef.current.textContent.trim();
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.error('Не удалось скопировать текст: ', err);
        }
        }
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 1500); 
    };
    return (
        <>
            {loading ? "" :
                <section className='connect'>
                    <img src="./img/connectionImg.png" alt="image" className='connect-img'/>
                    <div className="logo">
                        Бункер
                        <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
                    </div>

                    <h2 className="section-h2">Ожидание игроков</h2>

                    <div className="connect-info">
                        <h2>Пригласите пользователя по ссылке ниже</h2>
                        <div className="link" ref={linkRef}>
                            Бункер-ёпта?invite=1a2b3c4d5
                            <img src="./img/copy.svg" alt="copy" onClick={handleCopyClick}/>
                        </div>
                        <div className="people">Присоединилось 6 / 12</div>
                        <div className="waiting">Дождитесь начала игры</div>
                    </div>

                    <button onClick={handleclick} className="return">
                        <img src="./img/return.svg" alt="return" />
                    </button>
                    <button className="info">
                        <img src="./img/info.svg" alt="info" />
                    </button>

                    <div className={!copy ? "copied" : "copied copied-active"}>
                        Скопировано!
                    </div>
                </section>}
        </>
    );
};

export default WaitToConnect;