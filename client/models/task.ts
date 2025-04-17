export interface TaskItem {
  id: number;
  title: string;
  description?: string;
  status: boolean;
  due: Date;
};