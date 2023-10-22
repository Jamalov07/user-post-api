import { validate } from "class-validator";
import { HttpException } from "../exceptions";

export const ClassValidator = async (data: object, type: any): Promise<any> => {
	const payload = new type();
	Object.keys(data).forEach((key: string) => {
		payload[key] = data[key];
	});
	const errors = await validate(payload);
	// console.log(errors);
	if (errors.length) {
		throw new HttpException(400, errors.map((error) => Object.values(error.constraints)).flat(errors.length));
	}
	return data;
};
