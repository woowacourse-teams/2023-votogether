import { useState } from 'react';

export const useToggleSwitch = (firstText: string, secondText: string) => {
  const [selectedButton, setSelectedButton] = useState(firstText);

  const firstButton = {
    text: firstText,
    event: () => setSelectedButton(firstText),
  };

  const secondButton = {
    text: secondText,
    event: () => setSelectedButton(secondText),
  };

  return { selectedButton, firstButton, secondButton };
};
