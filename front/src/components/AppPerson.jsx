import React, { useEffect, useState } from "react";
import axios from "axios";
import PreLoader from './modules/PreLoader';
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";

const AppPerson = ({value, onChange}) => {
    const [data, setData] = useState(null);
    const [block, setBlock] = useState(1);

          {/* <p><strong>Название:</strong> {data.catastrophe_title}</p>
      <p><strong>Описание:</strong> {data.catastrophe_description}</p>
      <p><strong>Время проживания:</strong> {data.residence_time}</p> */}

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
        return <PreLoader/>
    }
    else
        return (
            <>
                {block == 1 ? <GoHistory firstValue={value} firstOnChange={onChange} value={block} onChange={setBlock} /> : 
                block == 2 ? <GoCatastrophe value={block} onChange={setBlock} /> : ""}
            </>
        );
};

export default AppPerson;