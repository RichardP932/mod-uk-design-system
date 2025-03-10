import styled, { css } from 'styled-components'
import { selectors } from '@defencedigital/design-tokens'

import { COMPONENT_SIZE, ComponentSizeType } from '../../Forms'

const { color, fontSize } = selectors

function removeAutoFillBackground() {
  return css`
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-transition: background-color 9999s ease-out;
    }

    filter: none; // Firefox
  `
}

interface StyledInputProps {
  $hasLabel: boolean
  $size?: ComponentSizeType
}

export const StyledInput = styled.input<StyledInputProps>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  border: 0;
  background: none;

  padding: ${({ $hasLabel, $size }) => {
    if ($size === COMPONENT_SIZE.SMALL || !$hasLabel) {
      return '6px 12px 7px 11px'
    }

    return '22px 12px 6px 11px'
  }};

  -webkit-tap-highlight-color: transparent;

  ${removeAutoFillBackground()}

  color: ${color('neutral', '600')};
  font-size: ${({ $size }) =>
    $size === COMPONENT_SIZE.SMALL ? fontSize('base') : fontSize('m')};

  height: ${({ $size }) => ($size === COMPONENT_SIZE.SMALL ? '31px' : '44px')};

  &:focus {
    outline: 0;
  }
`
