import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: `${process.env.CLIENT_API}`,
    method: ['GET', 'POST'],
    credentials: true,
  },
})
export class SocketGateway {
  server:Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  newTasks(data: any) {
    this.server.emit('newMatch', data);
  }
}
