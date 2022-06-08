module.exports = {
	onPreBuild: async ({ inputs }) => {
		if (process.env.BRANCH !== 'production') {
			const context = process.env.CONTEXT
			if (context === 'deploy-preview') {
				console.log(
					`Setting ADMIN_API_TOKEN to TEST_ADMIN_API_TOKEN value`
				)
				process.env.ADMIN_API_TOKEN = process.env.TEST_ADMIN_API_TOKEN
			} else if (process.env.BRANCH === 'master') {
				process.env.ADMIN_API_TOKEN =
					process.env.STAGING_ADMIN_API_TOKEN
			}
		}
	},
}
