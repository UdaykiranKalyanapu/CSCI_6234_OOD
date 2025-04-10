// services/user.service.js
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { BaseService } from "./base.service.js";

export class UserService extends BaseService {
	constructor() {
		super(User);
	}

	async getAllExcept(currentUserId) {
		return await this.model.find({ clerkId: { $ne: currentUserId } });
	}

	async getMessagesBetweenUsers(userId1, userId2) {
		return await Message.find({
			$or: [
				{ senderId: userId1, receiverId: userId2 },
				{ senderId: userId2, receiverId: userId1 },
			],
		}).sort({ createdAt: 1 });
	}
}