import { autoInjectable } from "tsyringe";
import { StudentRepository } from "../database/repository/student.repository";

@autoInjectable()
export class StudentService {
	constructor(private readonly repository: StudentRepository) {}
}
