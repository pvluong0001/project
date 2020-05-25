export function addTab(state, payloads) {
  const check = state.rememberTabs.find(item => item.label === payloads.label);

  if (!check) {
    state.rememberTabs.push(payloads);
  }
}

export function removeTab(state, tabIndex) {
  if (tabIndex === null) {
    state.rememberTabs = [];
    state.rememberTabs.push({
      label: 'Dashboard',
      path: '/admin',
    });
  } else {
    state.rememberTabs = state.rememberTabs.filter(
      (item, index) => index !== tabIndex);
  }
}
