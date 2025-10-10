export interface Message {
  id: number;
  senderId: string;
  receiverId: string | null;
  content: string | null;
  createdDate: string;
  isRead: boolean;
}
