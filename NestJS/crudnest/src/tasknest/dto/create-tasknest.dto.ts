export class CreateTasknestDto {
  id: number;

  name: string;

  salary: number;

  subordinates: CreateTasknestDto[];
}

// export class CreateTasknestDto {
//   id: number;
//   name: string;
// }
