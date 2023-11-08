import { ButtonHTMLAttributes } from 'react';

export interface ButtonInfo extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  handleClick: () => void;
}
