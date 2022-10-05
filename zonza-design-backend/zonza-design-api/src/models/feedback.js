const {
    getCurrentTime,
    addNotifications,
    unlinkFiles,
} = require("../helpers/helpers");

class Contact {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async all(req) {
        try {
            let limit = 15;
            if (req.body.limit !== "") limit = req.body.limit;

            let page = 1;
            if (req.body.page !== "") page = req.body.page;

            let startAt = parseInt(parseInt(limit) * (parseInt(page) - 1));

            let total_records = 0;
            const [total_result, total_fields] = await connectPool.query(
                `SELECT COUNT(*) as total_records from feedbacks`
            );

            if (total_result.length > 0) {
                total_records = total_result[0].total_records;
            }

            const [records, fields] = await connectPool.query(
                `SELECT * from feedbacks ORDER BY id DESC LIMIT ?,?`,
                [startAt, limit]
            );
            return {
                data: records,
                total_records: total_records,
            };
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Add new documents for each customer.
    async add(req) {
        try {
            let input = await req.body;
            let i = 0;
            const [insert_docs, fields] = await connectPool.query(
                `INSERT into feedbacks SET ?`,
                {
                    firstname: input.firstname,
                    surname: input.surname,
                    email: input.email,
                    subject: input.subject,
                    telephone: input.telephone,
                    improve: input.improve,
                    image_id: input.image_id,
                    rate: input.rate,
                }
            );

            return insert_docs;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Fetch single Documents details by its id.
    async view(req) {
        try {
            const [rows_docs] = await connectPool.query(
                `SELECT * from feedbacks WHERE id = ?`,
                [req.params.id]
            );

            return rows_docs;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Contact();
