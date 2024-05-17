export function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + '…' : source
}

export function convertDate(timestampString) {
  const date = new Date(timestampString)
  const options = {
    year: 'numeric',
    month: 'long',
  }
  const formatted = date.toLocaleDateString('fr-FR', options).replace('à', '-')
  return formatted[0].toUpperCase() + formatted.slice(1)
}
