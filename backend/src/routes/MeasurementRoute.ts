import { Router } from "express";
import MeasurementController from "../controller/MeasurementController";

const measurementRoute = Router();

measurementRoute.post("/add", MeasurementController.saveMeasurement);
measurementRoute.get("/get", MeasurementController.getAll);

export default measurementRoute;
