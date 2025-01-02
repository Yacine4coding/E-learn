import { formatService } from "../middleware/marketPlace.js";
import MarketPlace from "../models/marketPlace.js";

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
        tags = tags.split(",").map(ele=>ele.trim());
        console.log(tags)
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
  const { userId, name, email, message, serviceId } = req.body;
  if (!name || !email || !message)
    return res.status(422).send({ message: "all input are required" });
  if (!/^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[a-zA-Z]{3}$/.test(email))
    return res.status(400).send({
      message: "email format are inccorect",
    });
  try {
    const service = await MarketPlace.findById(serviceId);
    if (!service) return res.status(404).send({ message: "service not found" });
    const offer = {
      userId,
      name,
      email,
      message,
    };
    service.offers.push(offer);
    await service.save();
    res.status(200).send({ message: "offer created successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
