export type UserModel = {
  _id?: string;
  user: string;
  fullName: string;
  email?: string;
  password: string;
  navigation?: any;
};

export type UserFormProps = {
  user: UserModel | null;
  onSave: (category: UserModel) => void;
  onClose: () => void;
};