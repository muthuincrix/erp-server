const invoice = require('../../models/invoice')
module.exports = class Invoice {

   async createInvoice({body,req}){
    
    try {
        await invoice.create({

        })
    } catch (error) {
        return {status:"error", message:"can't create invoice"}
    }
    }

}
