import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import logger from './utils/logger'

function getInitials(name: string) {
  return name
    .split(/[\s-]+/)
    .map((namePart) => namePart[0])
    .join('')
}

function getKey(prefix: string, suffix: string | number): string {
  return `${prefix}-${suffix}`.replace(/\s/g, '')
}

function getId(prefix: string): string {
  return getKey(prefix, uuidv4())
}

function hasClass(allClasses: string, className: string) {
  return allClasses && allClasses.split(' ').includes(className)
}

function isIE11() {
  if (typeof window === 'undefined') {
    logger.warn(`window object does not exist`)

    return false
  }

  // @ts-ignore
  return !!window.MSInputMethodContext && !!document.documentMode
}

function warnIfOverwriting<P>(
  props: P,
  propertyName: string,
  componentName: string
) {
  if (props[propertyName]) {
    logger.warn(
      `Prop \`${propertyName}\` on \`${componentName}\` will be overwritten`
    )
  }
}

function withKey(
  element: React.ReactElement,
  prefix: string,
  suffix: string | number
) {
  if (element) {
    return React.cloneElement(element, {
      key: getKey(prefix, suffix),
    })
  }

  return null
}

function sleep(ms: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export {
  getInitials,
  getId,
  getKey,
  hasClass,
  isIE11,
  warnIfOverwriting,
  withKey,
  sleep,
}
