import File from './fileDTO'

export default interface NoteProblemDataItems {
  id: string
  type: string
  text?: string
  file?: File
}
