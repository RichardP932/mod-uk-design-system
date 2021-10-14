import { components } from 'react-select'
import { selectors } from '@defencedigital/design-tokens'
import styled from 'styled-components'

const { fontSize, spacing } = selectors

export const StyledSingleValue = styled(components.SingleValue)`
  font-size: ${fontSize('base')};
  overflow: visible;

  &&& {
    margin: ${spacing('4')} 0 0 0;
  }
`
