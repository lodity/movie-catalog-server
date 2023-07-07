export default class ApiError extends Error {
	status: number;
	errors: Array<{ [key: string]: any }>;

	constructor(
		status: number,
		message: string,
		errors: Array<{ [key: string]: any }> = []
	) {
		super(message);
		this.status = status;
		this.errors = errors;
	}
	static UnauthorizedError(message: string = '') {
		return new ApiError(401, 'User not authenticated' + message);
	}
	static BadRequest(
		message: string,
		errors: Array<{ [key: string]: any }> = []
	) {
		return new ApiError(400, message, errors);
	}
}
