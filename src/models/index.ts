export interface TagModel {
  name: string;
  id: string;
  value: string;
  highlight?: boolean;
}

export interface TagsPropModel {
  tags: TagModel[];
}

export interface TagPropModel extends TagModel {
  onRemove: (id: string) => void;
}