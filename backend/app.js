import express from 'express'
export const app = express()
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRoutes from './routes/auth.route.js'
import certificateRoutes from './routes/certificate.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv'

dotenv.config()


// middlewares fixed use
// app.use(cors()); // use for cross origin resource sharing
// app.options('*', cors());
app.use(
    cors({
      origin: '*',
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(express.json()); // use for parsing application/json
app.use(express.urlencoded({ extended: true })); // use for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // use for parsing cookies

// middleware routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
    res.send('Hello World')
})