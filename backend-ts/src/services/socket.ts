import { Socket } from 'socket.io';

export const connection = (socket: Socket) => {
  console.log(`socket client connected: ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`socket client disconnected: ${socket.id} - ${reason}`);
  });
};
