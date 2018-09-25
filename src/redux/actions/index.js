export const setDrawer = shouldShowDrawer => ({
  type: 'SET_DRAWER',
  val: shouldShowDrawer
})

export const setLogin = (id, password) => ({
  type: 'LOGIN'
})

export const refreshSchedule = (data) => ({
  type: 'REFRESH_SCHEDULE',
  data: data
})

const refreshScheduleState = (data) => ({
  type: 'REFRESH_SCHEDULE_STATE',
  data: data
}) 