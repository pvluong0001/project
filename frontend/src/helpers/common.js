export function flatArray (array) {
  return array.reduce((arr, element) => {
    arr = arr.concat(element)
    Array.isArray(element.children) && (arr = arr.concat(flatArray(element.children)))

    return arr
  }, [])
}

export function tree (data, root) {
  var t = {}

  data.forEach(o => {
    Object.assign(t[o._id] = t[o._id] || {}, o)
    t[o.parent] = t[o.parent] || {}
    t[o.parent].children = t[o.parent].children || []
    t[o.parent].children.push(t[o._id])
  })
  if(t[root]) {
    return t[root].children
  }

  const baseKeys = data.map(item => item.id)
  const keys = Object.keys(t)
  const rootKey = keys.filter(key => !baseKeys.includes(key))
  return t[rootKey].children
}

export function formatDateToVN (date) {
  const [year, month, day] = date.split('-')

  return `Ngày ${day} tháng ${month} năm ${year}`
}
