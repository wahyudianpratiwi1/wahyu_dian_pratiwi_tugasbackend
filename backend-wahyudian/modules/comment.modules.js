const mysql = require('../helpers/database')
const Joi = require('joi')

class _comment {
    addComment = async (body) => {
        try {
            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_artikel: Joi.number().required(),
                comment: Joi.string().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO comment (id_artikel, id_user, comment) VALUES (?, ?, ?)',
                [body.id_artikel, body.id_user, body.comment]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addComment comment module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _comment()