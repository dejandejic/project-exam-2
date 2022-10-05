const {
    getCurrentTime,
    addNotifications,
    unlinkFiles,
} = require("../helpers/helpers");

class Contact {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async getAllContacts(req) {
        try {
            let limit = 15;
            if (req.body.limit !== "") limit = req.body.limit;

            let page = 1;
            if (req.body.page !== "") page = req.body.page;

            let startAt = parseInt(parseInt(limit) * (parseInt(page) - 1));

            let total_records = 0;
            const [total_contacts, total_fields] = await connectPool.query(
                `SELECT COUNT(*) as total_records from contacts`
            );

            if (total_contacts.length > 0) {
                total_records = total_contacts[0].total_records;
            }
            const [contacts, fields] = await connectPool.query(
                `SELECT * from contacts ORDER BY id DESC LIMIT ?,?`,
                [startAt, limit]
            );
            return {
                data: contacts,
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
                `INSERT into contacts SET ?`,
                {
                    name: input.name,
                    email: input.email,
                    subject: input.subject,
                    message: input.message,
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
                `SELECT * from contacts WHERE id = ?`,
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
