const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage')
const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream')

const mongoURI = require('../../config/keys').mongoURI;

//connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//init gfs
let gfs;

conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
})

//storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({storage});

//POST file
router.post('/', upload.single('file'), (req, res) => {
    res.json({file: req.file})
});

//Get files from a list of filenames
router.get('/files', (req, res) => {
    gfs.files.find({filename: {$in: req.body}}).toArray((err, files) => {
        //check if files exist
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files);
    })
})

//diplay Image 
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        //check if files exist
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        //check if its an image
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            //read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res)
        }else{
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
})

module.exports = router;