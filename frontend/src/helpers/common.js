export function flatArray (array) {
  return array.reduce((arr, element) => {
    arr = arr.concat(element)
    Array.isArray(element.children) && (arr = arr.concat(flatArray(element.children)))

    return arr
  }, [])
}

export function tree (data, root, forChart = false) {
  var t = {}

  data.forEach(o => {
    Object.assign(t[o._id] = t[o._id] || {}, o)
    t[o.parent] = t[o.parent] || {}
    t[o.parent].children = t[o.parent].children || []
    t[o.parent].children.push(t[o._id])
  })
  if(t[root]) {
    return forChart ? [t[root]] : t[root].children
  }

  const baseKeys = data.map(item => item.id)
  const result = Object.entries(t).filter(([key, value]) => {
    return !baseKeys.includes(key)
  });

  return result.map(item => item[1])
}

export function formatDateToVN (date) {
  const [year, month, day] = date.split('-')

  return `Ngày ${day} tháng ${month} năm ${year}`
}
