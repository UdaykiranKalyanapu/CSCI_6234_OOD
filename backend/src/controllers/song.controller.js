// controllers/song.controller.js
import { SongService } from "../services/song.service.js";

const songService = new SongService();

export class SongController {
  async getAllSongs(req, res, next) {
    try {
      const songs = await songService.getAllSongs();
      res.json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getFeaturedSongs(req, res, next) {
    try {
      const songs = await songService.getFeaturedSongs();
      res.status(200).json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getMadeForYouSongs(req, res, next) {
    try {
      const songs = await songService.getMadeForYouSongs();
      res.status(200).json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingSongs(req, res, next) {
    try {
      const songs = await songService.getTrendingSongs();
      res.status(200).json(songs);
    } catch (error) {
      next(error);
    }
  }
}