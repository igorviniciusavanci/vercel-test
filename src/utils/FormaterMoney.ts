const convert = (value: number): number => {
  const val = 0.0
  if (value > 0) {
    return parseFloat((value * 100).toFixed(2))
  }
  return val
}

export { convert }
