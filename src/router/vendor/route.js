const router = require("express").Router();
module.exports = ({ passport, services, log }) => {
  router.post("/create-vendor", async (req, res) => {
  try {
   await services.vendor
      .createVendor(req.body,req)
      .then((responseVendor) => {
        return res.json(responseVendor);
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: "error", message: "something went wrong" });
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", message:"something went wrong"})
    }
    });


  return router;
};
