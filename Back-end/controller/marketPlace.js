import { formatService } from "../middleware/marketPlace.js";
import { formatDate } from "../middleware/time.js";
import MarketPlace from "../models/marketPlace.js";
import Offer from "../models/Offers.js";
import { isUserExist } from "./user.js";

export async function addService(req, res) {
  let {
    userId,
    title,
    description,
    budget,
    level,
    location = "",
    tags,
  } = req.body;
  if (!title || !description || !budget || !level || !location || !tags)
    return res
      .status(422)
      .send({ message: "except location and tags, all inputs are required " });
  try {
    // create new service
    tags = tags.split(",").map((ele) => ele.trim());
    console.log(tags);
    const newService = await new MarketPlace({
      title,
      description,
      userId,
      level,
      budget,
      location,
      tags,
    }).save();
    if (!newService)
      return res.status(400).send({ message: "service creation faild" });
    res.status(201).send({
      message: "service created successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getService(req, res) {
  const { serviceId } = req.params;
  try {
    const service = await MarketPlace.findById(serviceId);
    if (!service) return res.status(404).send({ message: "service not found" });
    res.status(200).send({
      service: await formatService(service),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getServices(req, res) {
  try {
    const servicesReq = await MarketPlace.find();
    if (servicesReq.length === 0) return res.status(204).send();
    const services = [];
    for (let srv of servicesReq) {
      let srvFormat = await formatService(srv);
      services.push(srvFormat);
    }
    res.status(200).send({ services });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function addOffer(req, res) {
  const { userId, message, serviceId } = req.body;
  if (!message)
    return res.status(422).send({ message: "message are required" });
  try {
    const service = await MarketPlace.findById(serviceId);
    if (!service) return res.status(404).send({ message: "service not found" });
    const offer = await Offer({
      userId,
      message,
    }).save();
    res.status(200).send({ message: "offer created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getPersonalServices(req, res) {
  const { userId } = req.body;
  try {
    const servicesData = await MarketPlace.find({ userId });
    if (servicesData.length === 0) return res.status(204).send();
    const services = [];
    for (let srv of servicesData) {
      srv = await formatService(srv);
      services.push(srv);
    }
    res.status(200).send({
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getOffers(req, res) {
  const { userId } = req.body;
  try {
    const offs = await Offer.find({ userId });
    if (offs.length === 0) return res.status(204).send();
    const offers = [];
    for (let offer of offs) {
      let service = await MarketPlace.findById(offer.serviceId);
      if (service) {
        service = await formatService(service);
        offers.push({
          id: offer._id,
          message: offer.message,
          createdAt: formatDate(offer.createdAt),
          service,
          progressing: offer.progressing,
        });
      }
    }
    res.status(200).send({ offers });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "internal server error",
    });
  }
}
export async function approveOffer(req, res) {
  const { serviceId, offerId, userId } = req.body;
  console.log(req.body)
  if (!serviceId || !offerId)
    return res
      .status(422)
      .send({ message: "service and offer id are required" });
  try {
    const service = await MarketPlace.findById(serviceId);
    if (!service) return res.status(404).send({ message: "service not found" });
    if (service.userId !== userId)
      return res
        .status(403)
        .send({ message: "you are not the owner of this service" });
    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).send({ message: "offer not found" });
    offer.progressing = {
      progress: "approved",
      date: formatDate(),
    };
    await offer.save();
    await Offer.updateMany(
      { _id: { $ne: offerId } , serviceId },
      { progressing: { progress: "rejected", date: formatDate() } }
    );
    res.status(200).send({ message: "aproved successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
