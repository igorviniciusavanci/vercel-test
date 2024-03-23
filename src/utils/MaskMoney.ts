//
export default class Money {
  static format(value: string): string {
    const l = value.replace(/^[0|\D]*/g, '')
    const d = l.match(/\d/g)
    if (!d) return 'R$ 0,00'
    if (d.length === 1) return `R$ 0,0${d[0]}`
    if (d.length === 2) return `R$ 0,${d[0]}${d[1]}`
    if (d.length === 3) return `R$ ${d[0]},${d[1]}${d[2]}`
    if (d.length === 4) return `R$ ${d[0]}${d[1]},${d[2]}${d[3]}`
    if (d.length === 5) return `R$ ${d[0]}${d[1]}${d[2]},${d[3]}${d[4]}`
    if (d.length === 6) return `R$ ${d[0]}.${d[1]}${d[2]}${d[3]},${d[4]}${d[5]}`
    if (d.length === 7) {
      return `R$ ${d[0]}${d[1]}.${d[2]}${d[3]}${d[4]},${d[5]}${d[6]}`
    }
    if (d.length === 8) {
      return `R$ ${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]},${d[6]}${d[7]}`
    }
    if (d.length === 9) {
      return `R$ ${d[0]}.${d[1]}${d[2]}${d[3]}.${d[4]}${d[5]}${d[6]},${d[7]}${d[8]}`
    }
    if (d.length === 10) {
      return `R$ ${d[0]}${d[1]}.${d[2]}${d[3]}${d[4]}.${d[5]}${d[6]}${d[7]},${d[8]}${d[9]}`
    }
    if (d.length >= 11) {
      return `R$ ${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]},${d[9]}${d[10]}`
    }
    return value
  }

  static strip(value: string): string {
    const l = value.replace(/[\D]*/g, '')
    const d = l.match(/\d/g)
    if (d) {
      d.splice(d.length - 2, 0, '.')
    }
    const result = d ? d.join('') : ''
    return result
  }
}
