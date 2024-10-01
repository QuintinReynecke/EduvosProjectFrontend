export interface insertMod {
  MainTable: {
    Id?: number
    ProfilePicture: string
    UserName: string
    Password: string
    Name: string
    Type: string
    RefreshToken: string
    RefreshTokenExpiration: Date
  }
}
