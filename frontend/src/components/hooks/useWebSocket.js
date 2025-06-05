// hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

export const useWebSocket = (roomId, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("❗ WebSocket roomId:", roomId);
    if (!roomId) return;

    const user_id =  crypto.randomUUID();
    localStorage.setItem('user_id', user_id);

    const socket = new WebSocket(`ws://localhost:8000/ws/room/${roomId}?user_id=${user_id}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Parsing error:', e);
      }
    };

    socket.onclose = (e) => {
      console.log('❌ WebSocket closed', e.code, e.reason);
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  return socketRef;
};
