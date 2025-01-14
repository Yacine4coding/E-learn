import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpg and .png files are allowed"));
  }
  cb(null, true);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace("\\middleware", "");
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export {__dirname}
export default upload;
