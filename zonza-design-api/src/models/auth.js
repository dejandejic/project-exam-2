const bcriptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    getCurrentTime,
    getLogo,
    addNotifications,
} = require("../helpers/helpers");
const EmailHandler = require("../handlers/emailhandler");

const UserModel = require("./user");

class Auth {
    constructor() {}
    async register(input, filename) {
        try {
            const [rows_user, fields] = await connectPool.query(
                "SELECT email,phone,username FROM users WHERE email = ? or phone = ? LIMIT 1",
                [input.email, input.phone]
            );

            if (rows_user.length === 0) {
                let hashed_password = await bcriptjs.hash(input.password, 8);
                let number =
                    (await input.phone.length) === 9
                        ? "0" + input.phone
                        : input.phone;

                let data = {
                    username: input.username,
                    email: input.email,
                    phone: number,
                    password: hashed_password,
                    logo: filename,
                    created_at: getCurrentTime(),
                    updated_at: getCurrentTime(),
                };
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO users set ? ",
                    data
                );
                return rows;
            }
            return rows_user;
        } catch (e) {
            throw new Error(e);
        }
    }

    async login(input) {
        try {
            const [rows_user, fields] = await connectPool.query(
                "SELECT * FROM users WHERE email = ?  LIMIT 1",
                [input.email]
            );
            // console.log(rows_user);
            if (rows_user.length > 0) {
                let user = rows_user[0];
                const password = user.password;
                const isMatch = await bcriptjs.compare(
                    input.password,
                    password
                );
                if (!isMatch) {
                    return [];
                }
                const token = await jwt.sign({ id: user.id }, "users");
                user = await UserModel.getUserFullDetails(user.id);
                user.token = token;

                return user;
            }
            return rows_user;
        } catch (e) {
            console.log(e);
            throw Error(e);
        }
    }

    async logout(input) {
        try {
            return true;
        } catch (e) {
            throw Error(e);
        }
    }
}

module.exports = new Auth();
