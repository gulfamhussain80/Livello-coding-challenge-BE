import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './src/routes/user.routes';
import hobbiesRoutes from './src/routes/hobbies.routes';

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = ''; // Add your MongoDB connection URL

mongoose.connect(dbUrl);

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', hobbiesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app