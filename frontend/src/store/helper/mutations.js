export function addTab (state, payloads) {
  const check = state.rememberTabs.find(item => item.path === payloads.path)

  if (!check) {
    state.rememberTabs.push(payloads)
  }
}

export function removeTab (state, tabIndex) {
  if (tabIndex === null) {
    state.rememberTabs = []
    state.rememberTabs.push({
      path: '/admin',
      title: 'Dashboard'
    })
  } else {
    state.rememberTabs = state.rememberTabs.filter((item, index) => index !== tabIndex)
  }
}
