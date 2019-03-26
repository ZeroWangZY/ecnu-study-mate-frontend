import { shape, string, arrayOf, number, instanceOf, bool } from 'prop-types'

export const planType = shape({
  content: string,
  title: string,
  timeRange: arrayOf(instanceOf(Date)),
  isImportant: bool,
  id: string
})

export const timePlanType = shape({
  id: number,
  relaxTime: arrayOf(number),
  sleepTime: arrayOf(number),
  studyTime: arrayOf(number),
  sportTime: arrayOf(number)
})
