export type ClassRoomModel = {
  _id?: string;
  title: string;
  resume: string;
  detail?: string;
  updatedAt?: string;
  category?: {
    name?: string;
  };
  user: {
    user: string;
  };
  image?: string;
  navigation?: unknown;
};

export type ClassRoom = {
  _id?: string;
  title: string;
  resume: string;
  detail?: string;
  updatedAt?: string;
  date?: string;
  category: string;
  user: string;
  image?: string;
  navigation?: unknown;
};

export type ClassRoomParams = {
  params: ClassRoomModel;
};

export type ClassRoomFormProps = {
  classRoom: ClassRoomModel | null;
  onSave: (user: ClassRoomModel) => void;
  onClose: () => void;
};
