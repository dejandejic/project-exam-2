const Feedback = require("../models/feedback");
const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const { check, validationResult } = require("express-validator");
const { unlinkFiles } = require("../helpers/helpers");

class FeedbackController {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async all(req, res) {
        try {
            const result = await Feedback.all(req);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
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
            const result = await Feedback.add(req);

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
            const result = await Feedback.view(req);

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

module.exports = new FeedbackController();
