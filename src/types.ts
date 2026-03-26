// types.ts
export interface Message {
  text: string;
  user: string;
  added: Date;
}

export interface NewMessageBody {
  messageUser: string;
  messageText: string;
}