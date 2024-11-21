export type CategoryModel = {
  _id?: string;
  name: string;
  navigation?: any;
};

export type CategoryFormProps = {
  category: CategoryModel | null;
  onSave: (category: CategoryModel) => void;
  onClose: () => void;
};
