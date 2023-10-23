import * as z from 'zod'
import Prisma from '@prisma/client'
import { CompletePresentation, RelatedPresentationModel } from './index'

// Helper schema for JSON fields
import JsonValue = Prisma.PrismaClient
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json | JsonValue> = z.lazy(() =>
	z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

export const SpreadsheetModel = z.object({
	id: z.string(),
	filename: z.string(),
	author: z.string(),
	contents: jsonSchema,
	created: z.union([z.string().transform((val) => new Date(val)), z.date()]),
	updated: z.union([z.string().transform((val) => new Date(val)), z.date()]),
})

export interface CompleteSpreadsheet extends z.infer<typeof SpreadsheetModel> {
	presentations: CompletePresentation[]
}

/**
 * RelatedSpreadsheetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSpreadsheetModel: z.ZodSchema<CompleteSpreadsheet> = z.lazy(() =>
	SpreadsheetModel.extend({
		presentations: RelatedPresentationModel.array(),
	})
)
