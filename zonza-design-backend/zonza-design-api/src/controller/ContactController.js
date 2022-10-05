const Contact = require("../models/contact");
const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const { check, validationResult } = require("express-validator");
const { unlinkFiles } = require("../helpers/helpers");

class ContactController {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async all(req, res) {
        try {
            const result = await Contact.getAllContacts(req);

            if (!result) {
                return ResponseHandler.errorResponse(
                    [...result],
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            ResponseHandler.successResponse(res, 200, MSGConst.SUCCESS, result);
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Add new documents for each customer.
    async add(req, res) {
        try {
            const result = await Contact.add(req);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }

            ResponseHandler.successResponse(
                res,
                200,
                MSGConst.ADD_CUSTOMER_DOCS,
                []
            );
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Fetch single Documents details by its id.
    async view(req, res) {
        try {
            const result = await Customer.view(req);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }

            ResponseHandler.successResponse(
                res,
                200,
                MSGConst.SUCCESS,
                result[0]
            );
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }
}

module.exports = new ContactController();
