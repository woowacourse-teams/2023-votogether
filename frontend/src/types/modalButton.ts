import { ButtonHTMLAttributes } from 'react';

export interface ModalButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  handleClick: () => void;
}
