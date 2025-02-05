import React, { useEffect, useState } from "react";
import GoHistory from './GoHistory';
import GoCatastrophe from "./GoCatastrophe";
import GoBunker from "./GoBunker";
import GoGame from "./GoGame";
import PreLoader from "./modules/PreLoader";
import Error from "./modules/Error";

const AppPerson = ({value, onChange}) => {
    const [block, setBlock] = useState(1);
    const [catastropheData, setCatastropheData] = useState(null);
    const [bunkerData, setBunkerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://127.0.0.1:8000/get_start_info');
                const jsonData = await response.json();
                if (jsonData && jsonData.catastrophe && jsonData.bunker) {
                    setCatastropheData(jsonData.catastrophe);
                    setBunkerData(jsonData.bunker);
                }
                setLoading(false);
            } 
            catch (e) {
                setError(e);
                setCatastropheData(null);
                setBunkerData(null);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if(loading)
        return <PreLoader/>

    if(error) {
        return <Error firstValue={value} firstOnChange={onChange}/>
    }

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