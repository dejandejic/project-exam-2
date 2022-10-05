const Customer = require("../models/customer");
const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const { check, validationResult } = require("express-validator");
const { unlinkFiles } = require("../helpers/helpers");

class CustomerController {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async getDocsByCustomerById(req, res) {
        try {
            const result = await Customer.getDocsByCustomerById(req);

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
    async addDocsByUser(req, res) {
        try {
            if (!req.files.customer_docs) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.FILE_TYPE_ERROR,
                    []
                );
            }
            if (!req.files) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.ERROR_CUSTOMER_DOCS,
                    []
                );
            }

            let filenames = [];
            if (req.files) {
                for (let i = 0; i < req.files.customer_docs?.length; i++) {
                    await filenames.push({
                        filename: req.files?.customer_docs[i].filename,
                        original_name: req.files?.customer_docs[i].originalname,
                    });
                }
            }

            const result = await Customer.addDocsByUser(req, filenames);

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
    async readDocById(req, res) {
        try {
            const result = await Customer.readDocById(req);

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

    // Update each document by its id.
    async updateDocsById(req, res) {
        try {
            if (!req.file) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.ERROR_CUSTOMER_DOCS,
                    []
                );
            }

            const result = await Customer.updateDocsByById(
                req,
                req.file.filename
            );

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

    // Delete each document by its id.
    async deleteDocById(req, res) {
        try {
            const result = await Customer.deleteDocById(req);

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
                MSGConst.DELETE_CUSTOMER_DOCS,
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
}

module.exports = new CustomerController();
