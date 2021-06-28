import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Color } from '../types/ConnectFour';
import { getElementIdFromRowCol } from '../utils/connectFour';

export const useConnectFour = () => {
  const [myColor, setMyColor] = useState<Color | null>(null);
  const [currentColor, setCurrentColor] = useState<Color | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const skt = io('http://localhost:3001');
    setSocket(skt);

    skt.on('connect', () => console.log(`socket connected: ${skt.id}`));

    skt.on('connect_error', () => {
      setTimeout(() => skt.connect(), 5000);
    });

    skt.on('my-color', (color: Color) => {
      console.log(`my color is: ${color}`);
      setMyColor(color);
    });

    skt.on(
      'add-ball',
      ({
        addedPosition,
        addedColor,
        currentColor: color,
      }: {
        addedPosition: { row: number; col: number };
        addedColor: Color;
        currentColor: Color;
      }) => {
        setCurrentColor(color);

        const elementId = getElementIdFromRowCol(addedPosition);
        const element = document.getElementById(elementId);

        if (!element) {
          console.error(`error: ${elementId} not found`);
          return;
        }

        const newDiv = document.createElement('div');
        newDiv.classList.add('style4');
        newDiv.classList.add(addedColor);

        element.appendChild(newDiv);
      }
    );

    skt.on('reset', () => {
      document.querySelectorAll('.style4').forEach((e) => e.remove());
    });

    skt.on('disconnect', () => console.log(`socket disconnected: ${skt.id}`));
  }, []);

  const addBallToColumn = (col: number) => {
    socket?.emit('add-ball-to-column', col);
  };

  return { myColor, currentColor, addBallToColumn };
};
