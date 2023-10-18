import type { Meta } from '@storybook/react';

import { useEffect, useRef, useState } from 'react';

import { Size } from '@type/style';

import { ToastInfo } from '@hooks/context/toast';

import { TOAST_TIME } from '@constants/animation';

import Toast from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      description: '토스트의 사이즈 조정',
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg', 'free'],
    },
  },
};

export default meta;

export const SizeCase = (args: { size: Size | 'free' }) => {
  //contextApi에 있는 훅 이동
  const [toastList, setToastList] = useState<ToastInfo[]>([]);
  const timeId = useRef<number | null>(null);

  useEffect(() => {
    if (timeId.current) window.clearTimeout(timeId.current);

    if (toastList.length !== 0) {
      timeId.current = window.setTimeout(() => {
        setToastList([]);

        if (timeId.current) window.clearTimeout(timeId.current);
      }, TOAST_TIME);
    }
  }, [toastList]);

  const addMessage = (message: string) => {
    if (toastList.find(toast => toast.text === message)) return;

    const id = Date.now();
    setToastList(toastList => [...toastList, { id, text: message }]);
  };

  return (
    <>
      <button
        onClick={() => addMessage(`toast no.${toastList.length + 1}`)}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        토스트 열기 버튼
      </button>
      {toastList.map(toast => (
        <Toast key={toast.id} {...args}>
          {toast.text}
        </Toast>
      ))}
    </>
  );
};
