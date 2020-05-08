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