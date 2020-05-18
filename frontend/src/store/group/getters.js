import { flatArray, tree } from 'helpers/common'

export function flattenGroup (state) {
  return state.list.length ? flatArray(state.list) : []
}

export function treeGroup (state) {
  return state.list.length ? tree(state.list, undefined) : []
}
