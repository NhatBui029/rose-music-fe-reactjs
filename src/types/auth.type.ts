export type Token = {
  accessToken: string | null
  refreshToken: string | null
}

export type UserData = {
  userId?: number
  userName?: string
  token?: Token
}

export type LoginFormData = {
  username: string
  password: string
}
