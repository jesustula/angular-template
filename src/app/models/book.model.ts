export interface Book {
  id: number;
  title: string;
  authorId: number;
  categoryId: number;
  coverUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}
