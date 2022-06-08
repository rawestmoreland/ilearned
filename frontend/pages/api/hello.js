// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	res.status(200).json({
		context: process.env.CONTEXT,
		env: process.env.NODE_ENV,
	})
}
