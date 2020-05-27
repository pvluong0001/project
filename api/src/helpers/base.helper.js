export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function fetchExplorerRoute(routers = {}, basePath = '/') {
  return Object.keys(routers).reduce((result, item) => {
    return {
      ...result,
      [item]: _convertRoute(routers[item], basePath)
    } 
  }, {})
}

function _convertRoute(router, basePath) {
  let layers = router.stack;

  return layers.filter(layer => layer.route).map(layer => {
    const path = `${basePath}${layer.route.path}`.replace('//', '/');

    return {
      path,
      method: Object.keys(layer.route.methods)[0].toUpperCase(),
      url: `http://localhost:${process.env.PORT}/${path}`
    }
  })
}

export function tree(data, root, forChart = false) {
  var t = {}

  data.forEach(o => {
    Object.assign(t[o._id] = t[o._id] || {}, o)
    t[o.parent] = t[o.parent] || {}
    t[o.parent].children = t[o.parent].children || []
    t[o.parent].children.push(t[o._id])
  })

  const baseKeys = data.map(item => item._id.toString());
  const result = Object.entries(t).filter(([key, value]) => {
    return !baseKeys.includes(key)
  });

  return result.map(item => item[1])
}