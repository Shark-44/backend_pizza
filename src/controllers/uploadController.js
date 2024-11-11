const fs = require("fs");

class UploadController {
  static uploadavecdossier = (req, res) => {
    const { dossier } = req.params;
    if (!dossier) {
      return res.status(400).send("Missing 'dossier' in the request body");
    }

    fs.rename(
      req.file.path,
      `public/assets/images/${dossier}/${req.file.originalname}`,
      (err) => {
        if (err) {
          // En cas d'erreur lors du renommage/déplacement du fichier
          return res.status(400).send("Error while uploading");
        }
        // En cas de succès
        return res.status(200).json({
          msg: "Upload success",
          url: `http://localhost:4242/public/assets/images/${dossier}/${req.file.originalname}`,
        });
      }
    );
  };
}

module.exports = UploadController;
