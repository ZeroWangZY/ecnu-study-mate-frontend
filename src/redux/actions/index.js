export const setDrawer = shouldShowDrawer => ({
  type: 'SET_DRAWER',
  val: shouldShowDrawer
})

export const setLogin = (id, password) => ({
  type: 'LOGIN'
})