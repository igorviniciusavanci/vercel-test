export const formatUnity = (unity: string): string => {
  switch (unity) {
    case 'Unidade':
      return 'Un'
    case 'Metro':
      return 'M'
    case 'Metro²':
      return 'M²'
    case 'Metro³':
      return 'M³'
    case 'Quilograma':
      return 'Kg'

    default:
      return ''
  }
}
