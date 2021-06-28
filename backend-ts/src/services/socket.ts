import { Socket } from 'socket.io';
import connectFour from '../models/ConnectFour';

export const connection = (socket: Socket) => {
  console.log(`socket client connected: ${socket.id}`);

  emitRoleColor(socket);

  socket.on('add-ball', (data) => addBall(socket, data));

  socket.on('disconnect', (reason) => {
    console.log(`socket client disconnected: ${socket.id} - ${reason}`);
  });
};

const emitRoleColor = (socket: Socket) => {
  const playerColor = connectFour.addPlayer();
  socket.emit('my-color', playerColor);
};

const addBall = (socket: Socket, { column }: { column: number }) => {
  const { addedPosition, addedColor, currentColor } = connectFour.addBall(column);
  socket.broadcast.emit('added-ball', { addedPosition, addedColor, currentColor });
};
