import MeasurementModel from "../models/MeasurementModel";
import { MeasurementInsertTYpe } from "../types/measurement";

export default class MeasurementService{
    static async saveMeasurement(measurement:MeasurementInsertTYpe){
        return await MeasurementModel.create(measurement);
    }

    static async getMeasurements(){
        return await MeasurementModel.find()
    }
}