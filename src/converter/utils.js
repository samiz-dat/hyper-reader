export function stripNamespace (name) {
  return name.replace(/^\w+:/, '')
}

export function prependNamespace (namespace, name) {
  return `${namespace}://${name}`
}
