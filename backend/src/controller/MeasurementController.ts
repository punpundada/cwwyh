import { NextFunction, Request, Response } from "express";
import {
  MeasurementInsertTYpe,
  MeasurementSelectType,
  MeasurementsInsertSchema,
} from "../types/measurement";
import MeasurementService from "../service/MeasurementService";
import { GenericResponse } from "../types/res";
import { Constants } from "../Constants";

export default class MeasurementController {
  static async saveMeasurement(
    req: Request<unknown, unknown, MeasurementInsertTYpe>,
    res: Response<GenericResponse<MeasurementInsertTYpe>>,
    next: NextFunction
  ) {
    try {
      const validMeasurement = MeasurementsInsertSchema.parse(req.body);
      const savedMeasurement = await MeasurementService.saveMeasurement(validMeasurement);

      if (savedMeasurement) {
        return res.status(Constants.CREATED).json({
          isSuccess: true,
          message: "Measurement saved successfully",
          result: savedMeasurement as any,
        });
      }
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        issues: [],
        message: "Someting went wrong",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request<unknown, unknown, unknown>,
    res: Response<GenericResponse<MeasurementSelectType>>,
    next: NextFunction
  ) {
    try {
      const allMeasurements = await MeasurementService.getMeasurements();
      if (allMeasurements) {
        return res.status(Constants.OK).json({
          isSuccess: true,
          message: "Request was successful",
          result: allMeasurements as any,
        });
      }
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        message: "Request was successful",
        issues: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
