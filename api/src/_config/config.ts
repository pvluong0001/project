const whiteList = ['http://localhost']

export const corsOptions = {
	origin (origin: any, callback: any) {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200
}