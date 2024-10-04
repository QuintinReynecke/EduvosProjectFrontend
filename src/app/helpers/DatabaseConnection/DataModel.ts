export interface insertMod {
  MainTable: {
    Id?: number;
    ProfilePicture: string;
    UserName: string;
    Password: string;
    Name: string;
    Type: string;
    Department: string;
    Groups: string;
    RefreshToken: string;
    RefreshTokenExpiration: Date;
  };

  PersonalChatsTable: {
    Id?: number;
    facultyType: string;
    question: string;
    answer: string;
    department: string;
    DateAdded: Date;
    mainTableFKId: number;
  };

  GroupMessageTable: {
    Id?: number;
    group_id: number;
    message: string;
    DateAdded: Date;
    mainTableFKId: number;
  };

  SubjectsTable: {
    Id?: number;
    Name: string;
    Code: string;
    Department: string;
  };

  DepartmentTable: {
    Id?: number;
    Name: string;
    Code: string;
  };

  FAQTable: {
    Id?: number;
    question: string;
    answer: string;
    department: string;
  };

}
