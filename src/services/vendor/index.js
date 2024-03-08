const vendor = require("../../models/vendor");
module.exports = class Vendor {
  async createVendor(body, req) {
    const {
      name,
      email,
      phone,
      companyDetails,
      billingAddress,
      shippingAddress,
      balance,
    } = body;
    return await vendor
      .create({
        name,
        orgId: req.session.orgId,
        email,
        phone,
        companyDetails,
        billingAddress,
        shippingAddress,
        balance,
      })
      .then((vendorResponse) => {
        return { status: "success", message: "create vendor successfully" };
      })
      .catch((error) => {
        return { status: "error", message: "can't create vendor" };
      });
  }
  
};
