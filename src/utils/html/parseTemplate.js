module.exports = function (string, params = {}) {
  const names = Object.keys(params)
  const values = Object.values(params)

  return new Function(...names, `return \`${string}\`;`)(...values)
}
