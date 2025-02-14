export type TMessage = {
  _id: string;
  text: string;
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
    profilePicture?: string;
  };
};
