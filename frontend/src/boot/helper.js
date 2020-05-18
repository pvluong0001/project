function asset (path) {
  return `${process.env.ASSETS_URL}/${path}`
}

export default async ({ Vue }) => {
  Vue.prototype.$asset = asset
}
