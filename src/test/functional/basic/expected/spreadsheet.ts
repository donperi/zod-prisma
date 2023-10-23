import * as z from 'zod'
import Prisma from '@prisma/client'

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
