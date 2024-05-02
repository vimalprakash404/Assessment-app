const fs = require("fs")
const csv = require("csv-parser")
const multer = require('multer');
async function bulkUserGenerator(req) {
    try {
        const results = [];
        return new Promise((resolve, reject) => {
            const fileBuffer = req.file.buffer;
            fileBuffer
                .pipe(csv())
                .on('data', (row) => {
                    // Log each row to the console
                    console.log(row);
                    results.push(row);
                })
                .on('end', () => {
                    console.log("______________________end", results[0])
                    resolve(results); // Resolve the promise with the processed data
                })
                .on('error', (err) => {
                    reject(err); // Reject the promise if an error occurs
                });
        })
            .then((data) => {
                // Send response after processing is complete
                return { message: 'CSV file uploaded and processed successfully.', code: 200, data };
            })
            .catch((err) => {
                // Handle any errors
                console.error('Error processing CSV:', err);
                return { message: 'Error processing CSV file.', code: 200 };
            });
        // return {message:'CSV file uploaded and processed successfully.' , code:200 };
    }
    catch (error) {
        console.error(error)
        return { success: false, message: "error while uploading the  file ", code: 500 };
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    // storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error('Only CSV files are allowed!'));
        }
        cb(null, true);
    }
});



async function createUsers(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const response = await bulkUserGenerator(req, res);
    console.log(response)
    return res.status(response.code).json(response);

}

module.exports = { createUsers, upload }