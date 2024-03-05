import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/UserRoute.js';
import dbConnection from './config/dbConnection.js';
import { Constants } from './Constants.js';
import IngredientRouter from './routes/IngredientRoute.js';
import RecipieRouter from './routes/RecipeRoute.js';
import cuisineRouter from './routes/CuisineRoute.js';
import DifficuiltyLevelRoute from './routes/DifficultyLevelRoute.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 9002;
app.use(cors());
app.use(json());
dbConnection();
app.use('/api/user', userRouter);
app.use('/api/ingredient', IngredientRouter);
app.use('/api/recipe', RecipieRouter);
app.use('/api/cuisine', cuisineRouter);
app.use('/api/level', DifficuiltyLevelRoute);
app.use((req, res) => {
    res.status(Constants.NOT_FOUND).json({ message: 'URI Not Found' });
});
app.listen(port, () => {
    console.log(`\nListning on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map