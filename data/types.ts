export type ActionResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};
