export interface MenuItem<T> {
  content: string;
  color: 'black' | 'red';
  action: T;
}
