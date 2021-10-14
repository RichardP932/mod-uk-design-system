import { components } from 'react-select'
import { selectors } from '@defencedigital/design-tokens'
import styled from 'styled-components'

const { spacing } = selectors

export const StyledIndicatorSeparator = styled(components.IndicatorSeparator)`
  margin-right: ${spacing('3')};
`
