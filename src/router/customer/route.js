const router = require("express").Router();

module.exports = ({ passport, services, log }) => {
   router.post('/create-customer',async (req,res)=>{
    try {
        req.body.req = req 
       await services.customer.createCustomer(req.body)
      .then((response) => {
            console.log(response);
            return res.json(response)
        })
      .catch((error) => {
            return error;
        });
    } catch (error) {
        throw error;
   } 
})
return router
}