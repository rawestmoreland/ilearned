require('dotenv').config()

exports.handler = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ context: process.env.CONTEXT }),
	}
}
