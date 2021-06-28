import { Socket } from 'socket.io';
import connectFour from '../models/ConnectFour';

export const connection = (socket: Socket) => {
  console.log(`socket client connected: ${socket.id}`);

  emitRoleColor(socket);

  socket.on('reset', () => reset(socket));

  socket.on('add-ball-to-column', (col: number) => addBallToColumn(socket, col));

  socket.on('disconnect', (reason) => {
    console.log(`socket client disconnected: ${socket.id} - ${reason}`);
  });
};

const emitRoleColor = (socket: Socket) => {
  const playerColor = connectFour.addPlayer();
  socket.emit('my-color', playerColor);
};

const addBallToColumn = (socket: Socket, col: number) => {
  const { addedPosition, addedColor, currentColor } = connectFour.addBallToColumn(col);
  socket.broadcast.emit('add-ball', { addedPosition, addedColor, currentColor });
};

const reset = (socket: Socket) => {
  connectFour.reset();
  socket.broadcast.emit('reset');
};
