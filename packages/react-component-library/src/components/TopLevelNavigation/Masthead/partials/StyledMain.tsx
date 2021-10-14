import { selectors } from '@defencedigital/design-tokens'
import styled from 'styled-components'

const { color } = selectors

export const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${color('neutral', '100')};
`
