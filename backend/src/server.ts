import express, { json } from 'express';
import cors from 'cors';
import userRouter from './routes/UserRoute';
import dbConnection from './config/dbConnection';
import { Constants } from './Constants';
import IngredientRouter from './routes/IngredientRoute';
import RecipieRouter from './routes/RecipeRoute';
import cuisineRouter from './routes/CuisineRoute';
import DifficuiltyLevelRoute from './routes/DifficultyLevelRoute';
import  env  from './lib/env';
import { commentRoute } from './routes/CommentRoute';

const app = express();
const port = env.PORT || 9002;
app.use(cors());
app.use(json())

dbConnection()

app.use('/api/user',userRouter) 
app.use('/api/ingredient', IngredientRouter);
app.use('/api/recipe',RecipieRouter);
app.use('/api/cuisine', cuisineRouter);
app.use('/api/level', DifficuiltyLevelRoute);
app.use('/api/comments', commentRoute);

app.use((req,res)=>{
    res.status(Constants.NOT_FOUND).json({ message: 'URI Not Found' });
})

app.listen(port , ()=>{
    console.log(`\nListning on http://localhost:${port}`);  
});