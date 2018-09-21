import Company from '@/models/Company'
import Contact from '@/models/Contact'
import Location from '@/models/Location'

export default interface Positions {
  title: string
  description: string
  company: Company
  location?: Location
  contact?: Contact[]
  remote?: boolean
  url?: string
}
