export const getDataType = (value: any) => {
  if (value.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) return 'Phone'
  if (value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return 'Email'
  if (value.match(/^-?\d*\.?\d*$/)) return 'Number'
  return 'String'
}
