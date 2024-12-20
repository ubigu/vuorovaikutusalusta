import 'zod-openapi/extend';
import { z } from 'zod';

const languageCodeSchema = z.enum(['fi', 'en', 'se']);
const enabledLanguagesSchema = z.record(languageCodeSchema, z.boolean());

const localizedTextSchema = z.record(languageCodeSchema, z.string());

const surveySchema = z.object({
  id: z.number().openapi({ description: 'The ID of the survey' }),
  name: z.string(),
  title: localizedTextSchema,
  subtitle: localizedTextSchema,
  author: z.string(),
  authorUnit: z.string(),
  authorId: z.string(),
  admins: z.array(z.string()),
  mapUrl: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  allowTestSurvey: z.boolean(),
  isPublished: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  pages: z.array(z.any()).optional(),
  backgroundImageUrl: z.string().optional(),
  thanksPage: z.object({
    title: localizedTextSchema,
    text: localizedTextSchema,
    imageUrl: z.string().optional(),
  }),
  theme: z.any(),
  sectionTitleColor: z.string(),
  email: z.object({
    enabled: z.boolean(),
    autoSendTo: z.array(z.string()),
    subject: localizedTextSchema,
    body: localizedTextSchema,
    info: z.array(z.any()),
  }),
  allowSavingUnfinished: z.boolean().optional(),
  localisationEnabled: z.boolean(),
  displayPrivacyStatement: z.boolean(),
  submissionCount: z.number(),
  marginImages: z.object({
    top: z.object({
      imageUrl: z.string(),
      altText: z.string().optional(),
    }),
    bottom: z.object({
      imageUrl: z.string(),
      altText: z.string().optional(),
    }),
  }),
  organization: z.string(),
  tags: z.array(z.string()),
  enabledLanguages: enabledLanguagesSchema,
});

export const apiSurveySchema = surveySchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Survey = z.infer<typeof surveySchema>;
export type APISurvey = z.infer<typeof apiSurveySchema>;

export const answerEntrySchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('free-text'),
      value: z.string(),
    }),
    z.object({
      type: z.literal('checkbox'),
      value: z.array(z.union([z.string(), z.number()])),
    }),
    z.object({
      type: z.literal('radio'),
      value: z.union([z.string(), z.number()]),
    }),
    z.object({
      type: z.literal('numeric'),
      value: z.number(),
    }),
    z.object({
      type: z.literal('map'),
      value: z.array(z.any()),
    }),
    z.object({
      type: z.literal('sorting'),
      value: z.array(z.number()),
    }),
    z.object({
      type: z.literal('slider'),
      value: z.number(),
    }),
    z.object({
      type: z.literal('matrix'),
      value: z.array(z.string()),
    }),
    z.object({
      type: z.literal('multi-matrix'),
      value: z.array(z.array(z.string())),
    }),
    z.object({
      type: z.literal('grouped-checkbox'),
      value: z.array(z.number()),
    }),
    z.object({
      type: z.literal('attachment'),
      value: z.array(
        z.object({
          fileString: z.string(),
          fileName: z.string(),
        }),
      ),
    }),
  ])
  .and(
    z.object({
      sectionId: z
        .number()
        .openapi({ description: 'The ID of the page section' }),
    }),
  );

export const submissionSchema = z.object({
  id: z.number(),
  timestamp: z.date(),
  answerEntries: z.array(z.any()),
});
