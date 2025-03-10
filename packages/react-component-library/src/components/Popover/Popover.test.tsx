// @ts-nocheck
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'

import { Popover } from '.'

const HOVER_ON_ME = 'Hover on me!'
const CONTENT_TEXT = 'This is some arbitrary JSX'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Popover', () => {
  const content: React.ReactElement = <pre>{CONTENT_TEXT}</pre>
  let clickSpy: (e: React.MouseEvent) => void
  let wrapper: RenderResult

  describe('when provided with arbitrary JSX content', () => {
    beforeEach(() => {
      clickSpy = jest.fn()

      wrapper = render(
        <>
          <Popover content={content}>
            <div
              style={{
                display: 'inline-block',
                padding: '1rem',
                backgroundColor: '#c9c9c9',
              }}
            >
              {HOVER_ON_ME}
            </div>
          </Popover>
          <button onClick={clickSpy} style={{ margin: '2rem' }}>
            Click me!
          </button>
        </>
      )
    })

    it('allows button covered by Popover to be clicked when Popover is hidden', () => {
      wrapper.queryByText('Click me!').click()
      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    describe('and the user hovers on the target element', () => {
      beforeEach(() => {
        fireEvent.mouseEnter(wrapper.getByText(HOVER_ON_ME))
      })

      afterEach(() => {
        jest.clearAllTimers()
      })

      it('should set the `aria-describedby` attribute to the ID of the content', () => {
        const contentId = wrapper
          .getByTestId('floating-box-content')
          .getAttribute('id')

        expect(wrapper.getByTestId('popover')).toHaveAttribute(
          'aria-describedby',
          contentId
        )
      })

      it('to be visible to the end user', () => {
        return waitFor(() => {
          expect(wrapper.getByTestId('floating-box-content')).toBeVisible()
        })
      })

      it('renders the provided arbitrary JSX', () => {
        expect(wrapper.getByTestId('floating-box-content').innerHTML).toContain(
          renderToStaticMarkup(content)
        )
      })

      describe('and the user unhovers from the target element', () => {
        beforeEach(() => {
          fireEvent.mouseOut(wrapper.getByText(HOVER_ON_ME))
        })

        it('hid the `Popover` after 1000ms', () => {
          expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
        })

        it('to not be visible to the end user', () => {
          return waitFor(() => {
            expect(wrapper.queryByText(CONTENT_TEXT)).not.toBeVisible()
          })
        })
      })
    })
  })

  describe('when the `Popover` uses the click mouse event', () => {
    beforeEach(() => {
      wrapper = render(
        <Popover content={<pre>This is some arbitrary JSX</pre>} isClick>
          <div>Click on me</div>
        </Popover>
      )
    })

    describe('and the user clicks on the target', () => {
      beforeEach(() => {
        fireEvent(
          wrapper.getByText('Click on me'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('to be visible to the end user', () => {
        return waitFor(() => {
          expect(wrapper.getByTestId('floating-box-content')).toBeVisible()
        })
      })

      describe('and the user clicks on the target again', () => {
        beforeEach(() => {
          fireEvent(
            wrapper.getByText('Click on me'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          )
        })

        it('to not be visible to the end user', () => {
          return waitFor(() => {
            expect(wrapper.queryByText(CONTENT_TEXT)).not.toBeVisible()
          })
        })
      })

      describe('and the user clicks elsewhere in the document', () => {
        beforeEach(() => {
          fireEvent(
            document,
            new MouseEvent('mousedown', {
              bubbles: true,
              cancelable: true,
            })
          )
        })

        it('to not be visible to the end user', () => {
          return waitFor(() => {
            expect(wrapper.queryByText(CONTENT_TEXT)).not.toBeVisible()
          })
        })
      })
    })
  })

  describe('when using a custom `closeDelay`', () => {
    beforeEach(() => {
      wrapper = render(
        <Popover content={content} closeDelay={100}>
          <div>{HOVER_ON_ME}</div>
        </Popover>
      )
    })

    describe('and the user hovers on the target element', () => {
      beforeEach(() => {
        fireEvent.mouseEnter(wrapper.getByText(HOVER_ON_ME))
      })

      describe('and the user unhovers from the target element', () => {
        beforeEach(() => {
          fireEvent.mouseOut(wrapper.getByText(HOVER_ON_ME))
        })

        it('hid the `Popover` after 100ms', () => {
          expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100)
        })
      })
    })
  })

  describe('when passing arbitrary props', () => {
    beforeEach(() => {
      wrapper = render(
        <Popover content={content} data-arbitrary="arbitrary">
          <div>{HOVER_ON_ME}</div>
        </Popover>
      )
    })

    describe('and the user hovers on the target element', () => {
      beforeEach(() => {
        fireEvent.mouseEnter(wrapper.getByText(HOVER_ON_ME))
      })

      it('should spread arbitrary props', () => {
        return waitFor(() => {
          expect(wrapper.getByTestId('popover')).toHaveAttribute(
            'data-arbitrary',
            'arbitrary'
          )
        })
      })
    })
  })
})
