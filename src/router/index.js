const router = require('express').Router();
const ProductRouter = require('./product/route');
const userRouter = require('./user/route')
const CustomerRouter = require('./customer/route')
const VendorRouter = require('./vendor/route')
module.exports = (props)=>{
    router.use('/user', userRouter(props));
    router.use('/product',ProductRouter(props));
    router.use('/customer',CustomerRouter(props))
    router.use('/vendor',VendorRouter(props))
    return router
}
