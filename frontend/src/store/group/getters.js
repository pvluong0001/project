import { flatArray, tree } from 'helpers/common'

export function flattenGroup (state) {
  return flatArray(state.list)
}

export function treeGroup (state) {
  return tree(state.list, undefined)
}
