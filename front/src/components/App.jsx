import { useEffect, useState } from "react"
import MainScreen from "./MainScreen"
import ConnectionToGame from "./ConnectionToGame";
import PreLoader from "./modules/PreLoader";
import WaitToConnect from "./WaitToConnect";
import GoHistory from "./GoHistory";
import AppPerson from "./AppPerson";

export default function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
          setLoading(false);
    }, []);
    const [step, setStep] = useState(1);
    return (
        <>
            {!loading ?
            step == 1 ? <MainScreen value={step} onChange={setStep} /> 
            : step == 2 ? <ConnectionToGame value={step} onChange={setStep} /> 
            : step == 3 ? <WaitToConnect value={step} onChange={setStep} /> 
            : step == 4 ? <AppPerson value={step} onChange={setStep} /> : "" 
            : <PreLoader/>
            }
        </>
    )
}