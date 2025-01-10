import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

const ConnectionToGame = ({value, onChange}) => {
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
            console.log('Текст скопирован!');
            // Можно добавить визуальное подтверждение, например, изменить иконку
        } catch (err) {
            console.error('Не удалось скопировать текст: ', err);
            // Обработка ошибки, если браузер не поддерживает clipboard API
        }
        }
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 2000); 
    };
    return (
        <>
            {loading ? "" :
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5, delay: 0.5}}
            >
                <section className='connect'>
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
                        <button className="start">Начать игру</button>
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
                </section>
            </motion.div>}
        </>
    );
};

export default ConnectionToGame;