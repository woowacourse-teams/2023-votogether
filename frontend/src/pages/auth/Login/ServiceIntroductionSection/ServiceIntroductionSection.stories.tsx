import type { Meta, StoryObj } from '@storybook/react';

import ServiceIntroductionSection from '.';

const meta: Meta<typeof ServiceIntroductionSection> = {
  component: ServiceIntroductionSection,
};

export default meta;
type Story = StoryObj<typeof ServiceIntroductionSection>;

export const Default: Story = {
  render: () => <ServiceIntroductionSection />,
};
