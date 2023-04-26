import DB from '../database/config'

export default async () => {
  return (await DB).collection('words')
}
