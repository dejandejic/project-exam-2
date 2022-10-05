const {
    getCurrentTime,
    addNotifications,
    unlinkFiles,
} = require("../helpers/helpers");

class Customer {
    constructor() {}

    // Fetching all customer documents according to customer id.
    async getDocsByCustomerById(req) {
        try {
            let limit = 15;
            if (req.body.limit !== "") limit = req.body.limit;

            let page = 1;
            if (req.body.page !== "") page = req.body.page;

            let startAt = parseInt(parseInt(limit) * (parseInt(page) - 1));
            console.log(startAt, page, limit);
            let total_records = 0;
            const [total_result, total_fields] = await connectPool.query(
                `SELECT COUNT(*) as total_records from customer_documents`
            );

            if (total_result.length > 0) {
                total_records = total_result[0].total_records;
            }
            let records, fields;
            if (limit === -1) {
                [records, fields] = await connectPool.query(
                    `SELECT * from customer_documents`
                );
            } else {
                [records, fields] = await connectPool.query(
                    `SELECT * from customer_documents ORDER BY id DESC  LIMIT ?,?`,
                    [startAt, limit]
                );
            }

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
    async addDocsByUser(req, filenames) {
        try {
            let input = await req.body;
            let i = 0;
            let docsUpload = [];

            while (i < filenames.length) {
                let data = {
                    filename: filenames[i].filename,
                    original_name: filenames[i].original_name,
                    created_at: getCurrentTime(),
                };

                const [insert_docs, fields] = await connectPool.query(
                    `INSERT into customer_documents SET ?`,
                    data
                );
                docsUpload.push(insert_docs[i]);
                i++;
            }

            return docsUpload;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Fetch single Documents details by its id.
    async readDocById(req) {
        try {
            const [rows_docs] = await connectPool.query(
                `SELECT * from customer_documents WHERE id = ?`,
                [req.params.id]
            );

            return rows_docs;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Update each document by its id.
    async updateDocsByById(req, filename) {
        try {
            const [rows_docs, docs_fields] = await connectPool.query(
                `SELECT * from customer_documents WHERE id = ?`,
                [req.params.id]
            );

            if (rows_docs.length === 1) {
                const [update_docs, fields] = await connectPool.query(
                    `UPDATE customer_documents SET filename = ? WHERE id = ?`,
                    [filename, req.params.id]
                );

                if (update_docs) {
                    unlinkFiles(`uploads/${rows_docs[0].filename}`);
                }
                return update_docs;
            }
            return rows_docs;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete each document by its id.
    async deleteDocById(req) {
        try {
            const [rows_docs, docs_fiels] = await connectPool.query(
                `SELECT filename from customer_documents WHERE id = ?`,
                [req.params.id]
            );
            const [delete_docs, fields] = await connectPool.query(
                `DELETE from customer_documents WHERE id = ?`,
                [req.params.id]
            );

            if (delete_docs) {
                unlinkFiles(`uploads/${rows_docs[0].filename}`);
                return delete_docs;
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Customer();
