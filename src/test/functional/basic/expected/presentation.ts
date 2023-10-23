import * as z from 'zod'

export const PresentationModel = z.object({
	id: z.string(),
	filename: z.string(),
	author: z.string(),
	contents: z.string().array(),
	created: z.union([z.string().transform((val) => new Date(val)), z.date()]),
	updated: z.union([z.string().transform((val) => new Date(val)), z.date()]),
})
