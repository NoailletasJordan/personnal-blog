export function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + '…' : source
}

export function convertDate(timestampString) {
  const date = new Date(timestampString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('fr-FR', options).replace('à', '-')
}
