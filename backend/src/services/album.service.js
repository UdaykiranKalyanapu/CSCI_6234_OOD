// album.service.js
import { Album } from "../models/album.model.js";

export class AlbumService {
  async getAllAlbums() {
    return await Album.find();
  }

  async getAlbumById(albumId) {
    const album = await Album.findById(albumId).populate("songs");
    if (!album) throw new Error("Album not found");
    return album;
  }
}