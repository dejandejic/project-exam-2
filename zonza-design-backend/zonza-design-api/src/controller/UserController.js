const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const User = require("../models/user");
class UserController {
    constructor() {}

    // Update user password by user id.
    async changePassword(req, res) {
        try {
            req.checkBody("currentpassword")
                .notEmpty()
                .withMessage("Please enter current password.")
                .isLength({ min: 8, max: 16 })
                .withMessage(
                    "The password must be 8 to 16 characters in length."
                );
            req.checkBody("newpassword")
                .notEmpty()
                .withMessage("Please enter new password.")
                .isLength({ min: 8, max: 16 })
                .withMessage(
                    "The password must be 8 to 16 characters in length."
                );
            req.checkBody("confirmpassword")
                .notEmpty()
                .withMessage("Please enter confirm password.")
                .isLength({ min: 8, max: 16 })
                .withMessage(
                    "The password must be 8 to 16 characters in length."
                );

            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            if (req.body.newpassword !== req.body.confirmpassword) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.PASSWORD_MATCH,
                    errors
                );
            }
            const result = await User.changePassword(req.params.id, req.body);

            if (result.checkPassword === false) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.OLD_PASSWORD,
                    []
                );
            }
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
                MSGConst.CHANGE_PASSWORD,
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

module.exports = new UserController();
