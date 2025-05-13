import { useEffect, useRef } from 'react';

export const useWebSocket = (roomId, onMessage) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!roomId) return;

        const user_id = localStorage.getItem('user_id') || crypto.randomUUID();
        localStorage.setItem('user_id', user_id);

        const socketUrl = `ws://localhost:8000/ws/room/${roomId}?user_id=${user_id}`;
        console.log("Connecting to:", socketUrl); // Добавьте этот лог
        const socket = new WebSocket(socketUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (e) {
                console.error('Message parsing error:', e);
            }
        };

        socket.onclose = (event) => {
            console.log('WebSocket disconnected:', event.code, event.reason);
            if (event.code === 4000) {
                alert('Комната заполнена. Максимум 12 игроков.');
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
        };
    }, [roomId, onMessage]);

    return { socketRef };
};