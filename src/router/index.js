const router = require('express').Router();
const userRouter = require('./user/route')

module.exports = (props)=>{
    router.use('/user', userRouter(props));
    return router
}
