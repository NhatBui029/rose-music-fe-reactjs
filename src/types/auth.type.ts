export type Token = {
  accessToken: string
  refreshToken: string
}

export type UserData = {
  accessToken: string | null
  refreshToken: string | null
  userId?: number
  userName?: string
}
