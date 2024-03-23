import 'numeral/locales/pt-br'

import numeral from 'numeral'

numeral.locale('pt-br')
const currency = (value: number): string => {
  return numeral(value).format('#,##0.00')
}

export { currency }
