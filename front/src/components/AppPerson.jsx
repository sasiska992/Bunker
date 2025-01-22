import React, { useEffect, useState } from "react";
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";
import GoBunker from "./GoBunker";
import GoGame from "./GoGame";
import backendData from './../jsons/backend_data.json';
import PreLoader from "./modules/PreLoader";

const AppPerson = ({value, onChange}) => {
    const [block, setBlock] = useState(1);

    const [catastropheData, setCatastropheData] = useState(null);
    const [bunkerData, setBunkerData] = useState(null);
    useEffect(() => {
        if (backendData && backendData.length > 0) {
            const randomIndex = Math.floor(Math.random() * backendData.length);
            const selectedCatastrophe = backendData[randomIndex].catastrophe;
            setCatastropheData(selectedCatastrophe);

            const selectedBunker = backendData[randomIndex].bunker;
            setBunkerData(selectedBunker);
        }
    }, []);

    if(!bunkerData)
        return <PreLoader/>

    return (
        <>
            {block == 1 ? <GoHistory firstValue={value} firstOnChange={onChange} value={block} onChange={setBlock} /> : 
            block == 2 ? <GoCatastrophe value={block} onChange={setBlock} catastropheData={catastropheData}/> : 
            block == 3 ? <GoBunker value={block} onChange={setBlock} bunkerData={bunkerData}/> : 
            block == 4 ? <GoGame value={block} onChange={setBlock} /> : ""}
        </>
    );
};

export default AppPerson;