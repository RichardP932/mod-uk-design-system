import { components } from 'react-select'
import { selectors } from '@defencedigital/design-tokens'
import styled from 'styled-components'

import { StyledLabel } from './StyledLabel'

const { color, spacing } = selectors

export const StyledControl = styled(components.Control)`
  padding: 0;
  margin: 0;

  &.rn-select__control--is-focused,
  &.rn-select__control--menu-is-open,
  &:hover {
    border-color: ${color('action', '600')};
    box-shadow: 0 0 0 1px ${color('action', '600')},
      0 0 0 4px ${color('action', '100')};
  }

  &.rn-select__control--is-focused ${StyledLabel} {
    transform: translate(${spacing('6')}, 6px) scale(0.8);
  }
`
