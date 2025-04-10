import { UserService } from "../services/user.service.js";

const userService = new UserService();

export class UserController {
	async getAllUsers(req, res, next) {
		try {
			const currentUserId = req.auth.userId;
			const users = await userService.getAllExcept(currentUserId);
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	async getMessages(req, res, next) {
		try {
			const myId = req.auth.userId;
			const { userId } = req.params;

			const messages = await userService.getMessagesBetweenUsers(myId, userId);
			res.status(200).json(messages);
		} catch (error) {
			next(error);
		}
	}
}