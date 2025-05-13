import { useState, useEffect } from 'react';
import MainScreen from './MainScreen';
import ConnectionToGame from './ConnectionToGame';
import WaitToConnect from './WaitToConnect';
import AppPerson from './AppPerson';
import PreLoader from './modules/PreLoader';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [roomId, setRoomId] = useState(null);
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const inviteId = urlParams.get('invite');
        if (inviteId) setRoomId(inviteId);
        setLoading(false);
    }, []);

    const handleCreateRoom = async () => {
        const response = await fetch('http://localhost:8000/rooms/create_room', {
            method: 'POST'
        });
        const data = await response.json();
        setRoomId(data.room_id);
        window.history.pushState({}, '', `?invite=${data.room_id}`);
        setStep(2);
    };

    const handleStepChange = (newStep) => {
        setStep(newStep);
    };

    return (
        <>
            {!loading ? (
                step === 1 ? (
                    <MainScreen 
                        onChange={handleStepChange} 
                        onCreateRoom={handleCreateRoom} 
                    />
                ) : step === 2 ? (
                    <ConnectionToGame 
                        roomId={roomId} 
                        onChange={handleStepChange} 
                    />
                ) : step === 3 ? (
                    <WaitToConnect 
                        roomId={roomId} 
                        onChange={handleStepChange} 
                    />
                ) : step === 4 ? (
                    <AppPerson roomId={roomId} />
                ) : null
            ) : (
                <PreLoader />
            )}
        </>
    );
}