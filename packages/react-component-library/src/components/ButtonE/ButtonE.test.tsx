import React, { FormEvent } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { IconBrightnessLow } from '@defencedigital/icon-library'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { ButtonE } from './index'

describe('Button', () => {
  let wrapper: RenderResult
  let onClickSpy: (event: FormEvent<HTMLButtonElement>) => void
  let button: HTMLElement

  beforeEach(() => {
    onClickSpy = jest.fn()
  })

  describe('default props', () => {
    beforeEach(() => {
      wrapper = render(<ButtonE onClick={onClickSpy}>Click me</ButtonE>)
      button = wrapper.getByText('Click me').parentElement
    })

    it('should default the type to "button"', () => {
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should not render an icon', () => {
      expect(wrapper.queryByTestId('button-icon')).toBeNull()
    })

    describe('when the button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(button)
      })

      it('should handle the click event', () => {
        expect(onClickSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when the onClick callback has not been specified', () => {
    beforeEach(() => {
      wrapper = render(<ButtonE>Click me</ButtonE>)
      button = wrapper.getByText('Click me').parentElement
    })

    it('does not throw an error when the button is clicked', () => {
      expect(() => fireEvent.click(button)).not.toThrow()
    })
  })

  describe('when the type is specified', () => {
    it.each`
      type        | expected
      ${'button'} | ${'button'}
      ${'submit'} | ${'submit'}
    `('should set the type attribute to $type', ({ type, expected }) => {
      wrapper = render(
        <ButtonE onClick={onClickSpy} type={type}>
          Click me
        </ButtonE>
      )
      button = wrapper.getByText('Click me').parentElement

      expect(button).toHaveAttribute('type', expected)
    })
  })

  describe('when an icon is specified', () => {
    beforeEach(() => {
      wrapper = render(<ButtonE icon={<IconBrightnessLow />}>Click me</ButtonE>)
    })

    it('should render an icon', () => {
      expect(wrapper.getByTestId('button-icon')).toBeInTheDocument()
    })

    it('should render the icon with an `aria-hidden` attribute', () => {
      expect(wrapper.queryByTestId('button-icon')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
    })
  })

  describe('when the button is loading', () => {
    beforeEach(() => {
      wrapper = render(
        <ButtonE icon={<IconBrightnessLow />} isLoading>
          Click me
        </ButtonE>
      )
    })

    it('disables the button', () => {
      expect(wrapper.getByTestId('button')).toBeDisabled()
    })

    it('hides the user-provided icon', () => {
      expect(wrapper.getByTestId('button-icon')).toHaveStyleRule(
        'visibility',
        'hidden'
      )
    })

    it('hides the button text', () => {
      expect(wrapper.getByTestId('button-icon')).toHaveStyleRule(
        'visibility',
        'hidden'
      )
    })

    it('shows a loading icon with the `aria-hidden` attribute', () => {
      expect(wrapper.getByTestId('loading-icon')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
    })
  })
})
