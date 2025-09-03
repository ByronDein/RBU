export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ConnectionTest {
  isConnected: boolean;
}