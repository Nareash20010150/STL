import {query} from '../config/db.js'

const getPayment = async (req, res) => {
    try {
        const result = await query('SELECT * FROM payment')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//insert payment
const insertPayment = async (req, res) => {
    try {
        const { payment_id, payment_type, payment_date, payment_amount, payment_status } = req.body
        const result = await query('INSERT INTO payment (payment_id, payment_type, payment_date, payment_amount, payment_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
         [payment_id, payment_type, payment_date, payment_amount, payment_status])
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


export { getPayment, insertPayment }