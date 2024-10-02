export type Token = {
  accessToken: string | null
  refreshToken: string | null
}

export type UserData = {
  // accessToken: string | null
  // refreshToken: string | null
  userId?: number
  userName?: string
}

export type LoginFormData = {
  username: string
  password: string
}
