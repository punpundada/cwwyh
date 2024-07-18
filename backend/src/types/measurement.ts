import z from "zod";

export const MeasurementsInsertSchema = z.object({
  name: z.string({ required_error: "Measurement name is required" }),
  type: z.enum(["volume", "weight", "count", "miscellaneous", "specialized"], {
    errorMap: () => ({ message: "Please entre correct measurement type" }),
  }),
});

export const MeasurementSelectSchema = z.object({
  _id: z.string(),
  name: z.string({ required_error: "Measurement name is required" }),
  type: z.enum(["volume", "weight", "count", "miscellaneous", "specialized"], {
    errorMap: () => ({ message: "Please entre correct measurement type" }),
  }),
});

export type MeasurementInsertTYpe = z.infer<typeof MeasurementsInsertSchema>;
export type MeasurementSelectType = z.infer<typeof MeasurementSelectSchema>;
