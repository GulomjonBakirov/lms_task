export interface IStudent {
  group: {
    groupName: string
    capacity: number
  }
  user: {
    firstName: string
    lastName: string
    email: string
    role: string
  }
  grade: {
    grade: number
  }
  createdAt: Date
  editedAt: Date
}
