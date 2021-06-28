import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Color } from '../types/ConnectFour';
import { width } from '../constants/connectFour';

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
        addedPosition: [number, number];
        addedColor: Color;
        currentColor: Color;
      }) => {
        setCurrentColor(color);

        const id = addedPosition[0] * width + addedPosition[1];
        const element = document.getElementById(`element-${id}`);

        if (!element) {
          console.error(`error: element-${id} not found`);
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

  return { myColor, currentColor };
};
