const {
    getCurrentTime
} = require("../helpers/helpers");
const bcrypt = require("bcryptjs");
class User {
    constructor() {}


    // Update user password by user id.
    async changePassword(id, input) {
        try {
            const [rows_user, fields] = await connectPool.query(
                `SELECT id, password from users WHERE id = ? LIMIT 1`,
                [id]
            );
            if (rows_user.length === 1) {
                const checkPassword = await bcrypt.compare(
                    input.currentpassword,
                    rows_user[0].password
                );

                if (checkPassword) {
                    const newpassword = await bcrypt.hash(input.newpassword, 8);
                    const [rows, fields] = await connectPool.query(
                        `UPDATE users SET 
              password = '${newpassword}',
              updated_at = '${getCurrentTime()}'              
              WHERE users.id = ?`,
                        [id]
                    );
                }
                let data = { checkPassword };
                return data;
            }
            return rows_user;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new User();
