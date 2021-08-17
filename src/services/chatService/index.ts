import { Socket } from "socket.io-client";

interface IMessages{
  username: string;
  date: Date;
  message: any;
}

class ChatService {

  // public async joinChatRoom(socket: Socket, roomId: string): Promise<boolean> {
  //   return new Promise((rs, rj) => {
  //     socket.emit("join_chat", { roomId });
  //     socket.on("chat_joined", () => rs(true));
  //     socket.on("chat_join_error", ({ error }) => rj(error));
  //   });
  // }

  public async sendMessage(socket : Socket, message: IMessages) {
    socket.emit("send_message", message);
  }

  public async OnsendMessage(socket : Socket, Listiner:(message:IMessages)=>void) {
    socket.on("new_send_message", Listiner);
  }
}

export default new ChatService();
export type {IMessages};