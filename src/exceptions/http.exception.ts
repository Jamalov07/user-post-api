export class HttpException extends Error {
	public status: number;
	public message: string;

	constructor(status: number, message: string | any) {
		super(message);
		this.message = message;
		this.status = status;
	}
}
