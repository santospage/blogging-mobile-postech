export type ClassRoomModel = {
  _id: string;
  title: string;
  detail?: string;
  resume: string;
  image?: string;
  updatedAt: string;
  category: {
    name: string;
  };
  user: {
    user: string;
  };
  navigation?: any;
};

export type ClassRoomParams = {
  params: ClassRoomModel;
};

export type ClassRoomFormProps = {
  classRoom: ClassRoomModel | null;
  onSave: (user: ClassRoomModel) => void;
  onClose: () => void;
};
