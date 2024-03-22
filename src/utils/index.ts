export function capitalize(str: string) {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase()
}
