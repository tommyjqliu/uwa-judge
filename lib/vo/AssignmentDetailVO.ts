import { User,Problem, Assignment,ProblemsOnAssignments,UsersOnAssignments } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
type UserWithoutPassword = Omit<User, 'password'>;
export type UserWithRoles = UserWithoutPassword & {
    roles: JsonValue;  
  };
export class AssignmentDetailVO {
    readonly assignmentId: number;
    readonly title: string;
    readonly description: string|null;
    readonly publishDate: Date|null;
    readonly dueDate: Date|null;
    readonly users:UserWithoutPassword[];
    readonly problems:string[];

    constructor(assignmentId: number, title: string,
        description:string|null, publishDate: Date|null,
        dueDate: Date|null, users:UserWithoutPassword[],
        problems:string[]
        ) {
        this.assignmentId = assignmentId;
        this.title = title;
        this.description = description;
        this.publishDate = publishDate;
        this.dueDate = dueDate;
        this.users = users;
        this.problems = problems;
    }


    toJSON(): { assignmentId: number, title: string,
        description:string|null, publishDate: Date|null,
        dueDate: Date|null, users:UserWithoutPassword[],
        problems:string[] } {
        return {
        assignmentId: this.assignmentId,
        title :this.title,
        description : this.description,
        publishDate: this.publishDate,
        dueDate : this.dueDate,
        users :this.users,
        problems : this.problems
        };
    }
}