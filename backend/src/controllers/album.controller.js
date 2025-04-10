import { AlbumService } from "../services/album.service.js";

export class AlbumController {
  constructor() {
    this.albumService = new AlbumService();
  }

  getAllAlbums = async (req, res, next) => {
    try {
      const albums = await this.albumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      next(error);
    }
  };

  getAlbumById = async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const album = await this.albumService.getAlbumById(albumId);
      res.status(200).json(album);
    } catch (error) {
      if (error.message === "Album not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  };
}