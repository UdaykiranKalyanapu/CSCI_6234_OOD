import { StatService } from "../services/stat.service.js";

const statService = new StatService();

export const getStats = async (req, res, next) => {
  try {
    const stats = await statService.fetchStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};