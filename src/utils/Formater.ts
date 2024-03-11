import numeral from 'numeral'
import 'numeral/locales/pt-br'

numeral.locale('pt-br')
const currency = (value: number): string => {
  return numeral(value).format('#,##0.00')
}

export { currency }
