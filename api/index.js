import express from 'express'
import postRoute from './routes/posts.js'
import authRoute from './routes/auth.js'
// import userRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'

const app = express();
const PORT = 8800;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
  
const upload = multer({ storage: storage })
  
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    return res.status(200).json(file.filename)
})


app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    console.log(`Backend server connected on Port ${PORT}`);
})