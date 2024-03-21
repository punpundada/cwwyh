import CuisineModel from "../models/CuisineModel.js";
import { Constants } from "../Constants.js";

const addCuisine = async (req, res) => {
  const { cuisineName } = req.body;
  if (!cuisineName) {
    return res
      .status(Constants.VALIDATION_ERROR)
      .json({ isSuccess: false, data: { message: "Missing Fields" } });
  }

  try {
    const availableCuisine = await CuisineModel.findOne({
      cuisineName: cuisineName.toUpperCase(),
    });
    if (availableCuisine) {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: {
          message: `Cuisine By ${cuisineName.toUpperCase()} is already available`,
        },
      });
    }

    const cuisine = await CuisineModel.create({
      cuisineName: cuisineName.toUpperCase(),
    });
    if (cuisine) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: { message: `${cuisineName.toUpperCase()} added` },
      });
    } else {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: `${cuisineName.toUpperCase()} was not added` },
      });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: true, data: { message: error.message } });
  }
};

const getAllCuisine = async (req, res) => {
  try {
    const cuisines = await CuisineModel.find();
    if (cuisines) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { cuisines, message: "Cuisines fetch success" },
      });
    } else {
      return res
        .status(Constants.SERVER_ERROR)
        .json({ isSuccess: false, data: { message: "SomeThing went Wrong" } });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const updateCuisine = async (req, res) => {
  const { cuisineId, cuisineName } = req.body;
  if (!cuisineId || !cuisineName) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: { cuisineId, message: "All fields are required" },
    });
  }

  try {
    const updatedCuisine = CuisineModel.findByIdAndUpdate(
      cuisineId,
      { cuisineName },
      { new: true } //returns new modifiend object
    );

    if (updateCuisine) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { updateCuisine, message: "Cuisine Updated Successfully" },
      });
    } else {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: { message: "Cuisine was not Updated" },
      });
    }
  } catch (error) {
    return res.status(Constants.OK).json({
      isSuccess: false,
      data: { updateCuisine, message: error.message },
    });
  }
};

const deleteCuisine = async (req, res) => {

    const cousineId  = req.params.id;
    if (!cousineId) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "id Not Found" },
      });
    };
  try {

    const deleted = await CuisineModel.findByIdAndDelete({ _id: cousineId });
    if (deleted) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { message: `Cuisine with id ${cousineId} deleted` },
      });
    } else {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "Cuisine Not Deleted" },
      });
    }
  } catch (error) {
    return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message:error.message },
      });
  }
};

export { addCuisine, getAllCuisine, updateCuisine,deleteCuisine };
