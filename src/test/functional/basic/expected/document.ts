import * as z from 'zod'

export const DocumentModel = z.object({
	id: z.string(),
	filename: z.string(),
	author: z.string(),
	contents: z.string(),
	created: z.union([z.string().transform((val) => new Date(val)), z.date()]),
	updated: z.union([z.string().transform((val) => new Date(val)), z.date()]),
})
