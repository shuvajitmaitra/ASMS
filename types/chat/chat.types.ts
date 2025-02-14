export type UserData = {
  _id: string;
  displayName: string;
  profilePicture: string;
  role?: "admin" | "member";
  isIamBlocked?: boolean;
  amIBlocked?: boolean;
  isActive?: boolean;
};

export type GroupChatData = {
  _id: string;
  chatName: string;
  isGroupChat: true;
  membersCount: number;
  unreadCount: number;
  myData: UserData;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DirectChatData = {
  _id: string;
  isGroupChat: false;
  myData: UserData;
  otherUser: {
    _id: string;
    displayName: string;
    profilePicture: string;
    isActive: boolean;
  };
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Union type for chats
export type TChat = GroupChatData | DirectChatData;
