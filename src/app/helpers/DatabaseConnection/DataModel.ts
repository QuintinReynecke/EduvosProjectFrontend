export interface insertMod {
  // TODO: cleanup main - Remove unnessasery variable
  MainTable: {
    Id?: number
    ProfilePicture: string
    UserName: string
    Password: string
    Name: string
    Type: string
    Rating: number
    Description: string
    // Province: string
    CallOutFee: string
    Active: boolean
    TotalPhotos: number
    RefreshToken: string
    RefreshTokenExpiration: Date
  }

  ContactDetailsTable: {
    Id?: number
    Phone: string
    Website: string
    Email: string
    Address: string
    Location: string
    mainTableFKId: number
  }

  BusinessHoursTable: {
    Id?: number
    Monday: boolean
    Tuesday: boolean
    Wednesday: boolean
    Thursday: boolean
    Friday: boolean
    Saturday: boolean
    Sunday: boolean
    mainTableFKId: number
  }

  PhotosTable: {
    Id?: number
    ImageUrl: string
    mainTableFKId: number
  }

  WorkLocationTable: {
    Id?: number
    workInCountry: string | null
    province: string | null
    suburb: string | null
    mainTableFKId: number
  }

  UserTable: {
    Id?: number
    isCertified: boolean
    proofOfCertification: string
    mainTableFKId: number
  }

  CategoryTable: {
    Id?: number
    Category: string | null
    SubCategory: string | null
    mainTableFKId: number
  }

  JobRequest: {
    Id?: number
    UserId: number
    Title: string
    Description: string
    Location: string
    SubCategory: string
    DateRequested: Date
    AttachedQuote: string
    SendQuoteTo: string
    Status: string
    Rating: number
    ReviewComment: string
    mainTableFKId: number
  }

  Favorites: {
    Id?: number
    ServiceUserName: string
    ServiceUserID: number
    mainTableFKId: number
  }

  SubscriptionTable: {
    Id?: number
    SubscriptionType: string
    SubscriptionStartDate: Date
    SubscriptionEndDate: Date
    AutoRenew: boolean
    Price: number
    mainTableFKId: number
  }
}
