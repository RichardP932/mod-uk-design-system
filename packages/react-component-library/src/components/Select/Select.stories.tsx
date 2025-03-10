import React from 'react'
import { Story, Meta } from '@storybook/react'
import { IconAnchor } from '@defencedigital/icon-library'

import { Select, SelectProps } from './index'

const options = [
  { value: 'chocolate', label: 'Chocolate', badge: 100 },
  { value: 'melon', label: 'Melon' },
  { value: 'strawberry', label: 'Strawberry' },
]

export default {
  component: Select,
  title: 'Select',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component:
          'This component wraps a popular open-source library. See comprehensive documentation [here](https://github.com/JedWatson/react-select#readme).',
      },
    },
  },
} as Meta

const Template: Story<SelectProps> = (args) => (
  <div style={{ height: args.isDisabled ? 'initial' : '10rem' }}>
    <Select {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  options,
  label: 'Example label',
  name: 'select-default',
  defaultMenuIsOpen: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  options,
  label: 'Example label',
  name: 'select-disabled',
  isDisabled: true,
}

export const NotClearable = Template.bind({})
NotClearable.storyName = 'Not clearable'
NotClearable.args = {
  options,
  label: 'Example label',
  name: 'select-not-clearable',
  isClearable: false,
}

export const WithIcons = Template.bind({})
WithIcons.storyName = 'With icons'
WithIcons.args = {
  options: options.map((option) => ({
    ...option,
    icon: <IconAnchor />,
  })),
  label: 'Example label',
  name: 'select-icons',
}
