import { MutableRefObject, useContext, useEffect, useRef } from 'react'
import { debounce } from 'lodash'

import { TimelineContext } from '../context'
import { TIMELINE_ACTIONS } from '../context/types'
import { TIMELINE_ROW_HEADER_WIDTH } from '../constants'

export function useTimelineWidth(
  hasSide: boolean,
  isFullWidth: boolean
): {
  timelineRef: MutableRefObject<HTMLDivElement>
} {
  const timelineRef = useRef<HTMLDivElement>()
  const { dispatch } = useContext(TimelineContext)

  function getWidth() {
    const timelineWidth = timelineRef.current.getBoundingClientRect().width
    const sideWidth = hasSide ? TIMELINE_ROW_HEADER_WIDTH : 0
    return timelineWidth - 1 - sideWidth
  }

  function dispatchWidthChange(
    type:
      | typeof TIMELINE_ACTIONS.CHANGE_WIDTH
      | typeof TIMELINE_ACTIONS.INITIALISE = TIMELINE_ACTIONS.CHANGE_WIDTH
  ) {
    return () => {
      dispatch({
        type,
        width: isFullWidth ? getWidth() : null,
      })
    }
  }

  /* eslint-disable consistent-return */
  useEffect(() => {
    dispatchWidthChange(TIMELINE_ACTIONS.INITIALISE)()

    if (isFullWidth) {
      window.addEventListener('resize', debounce(dispatchWidthChange(), 250))
      return () => {
        window.removeEventListener(
          'resize',
          debounce(dispatchWidthChange(), 250)
        )
      }
    }
  }, [])

  return {
    timelineRef,
  }
}
