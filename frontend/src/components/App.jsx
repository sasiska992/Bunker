// App.jsx
import { useState, useEffect } from 'react';
import MainScreen from './MainScreen';
import ConnectionToGame from './ConnectionToGame';
import WaitToConnect from './WaitToConnect';
import AppPerson from './AppPerson';

export default function App() {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState(null);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const invite = new URLSearchParams(window.location.search).get('invite');
    if (invite) {
      setRoomId(invite);
      setIsHost(false);
      setStep(3);
    }
  }, []);

  const handleCreateRoom = async () => {
    const res = await fetch('http://localhost:8000/rooms/create_room', {
      method: 'POST'
    });
    const data = await res.json();
    setRoomId(data.room_id);
    setIsHost(true);
    window.history.pushState({}, '', `?invite=${data.room_id}`);
    setStep(2);
  };

  const handleReset = () => {
    window.history.pushState({}, '', '/');
    setIsHost(false);
    setRoomId(null);
    setStep(1);
  };

  return (
    <>
      {step === 1 && <MainScreen onCreate={handleCreateRoom} onJoin={(id) => { setRoomId(id); setStep(3); }} />}
      {step === 2 && <ConnectionToGame roomId={roomId} onStartGame={() => setStep(4)} onLeave={handleReset} />}
      {step === 3 && <WaitToConnect roomId={roomId} onGameStart={() => setStep(4)} onLeave={handleReset} />}
      {step === 4 && (
            <AppPerson
                value={step}
                onChange={(val) => setStep(val)}
            />
        )}
    </>
  );
}
