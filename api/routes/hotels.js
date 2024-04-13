import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
const router = express.Router();
//CREATE
router.post("/:userid",createHotel);

//UPDATE
router.put("/:id",updateHotel);
//DELETE
router.delete("/:id/:userid", deleteHotel);
//GET

//GET ALL

router.get('/id', async (req, res) => {
  try {
    const { name,address } = req.query; // Assuming name and address are the credentials
    const hotel = await Hotel.findOne({ name:name, address:address}); // Only retrieve the ID
    if (hotel) {
      res.status(200).json({ hotelId: hotel._id });
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error fetching hotel ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
