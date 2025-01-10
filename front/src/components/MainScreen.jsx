import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const MainScreen = ({value, onChange}) => {
    const [loading, setLoading] = useState(true);
        useEffect(() => {
            setLoading(false);
    }, []);
    const handleclick = () => {
        value = 2;
        onChange(value);
    }
    return (
        <>
            {loading ? "" :
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
            >
            <section className='mainScreen'>
                <div className="logo">
                    Бункер
                    <img src="./img/bunkerLogo.svg" alt="bunkerIcon" />
                </div>

                <div className="mainScreen-wrapper">
                    <div className="join">
                        <input type="text" className="txt" placeholder='Введите код комнаты'/>
                        <div className="line"></div>
                        <button onClick={handleclick} className="btn">Присоединиться</button>
                    </div>
                    <div className="scull">
                        <img src="./img/scull.svg" alt="scull" />
                        Cheat to survive
                    </div>
                    <div className="create">
                        <button className="btn">Создать комнату</button>
                    </div>
                </div>
            </section>
            </motion.div>}
        </>
    );
};

export default MainScreen;