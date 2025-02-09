export class Task {
  constructor(
    public title: string,
    public desc: string,
    public AssignedTo: string,
    public createrAt: string,
    public priority: string,
    public status: string,
    public id?: string
  ) {}
}
