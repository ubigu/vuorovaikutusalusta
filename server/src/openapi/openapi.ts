import 'zod-openapi/extend';
import { z } from 'zod';
import { createDocument } from 'zod-openapi';
import { apiSurveySchema, submissionSchema } from '@schemas/survey';

export const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Kartalla API',
    description: 'API for Kartalla',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://test.kartalla.io/api',
      description: 'Test server',
    },
    {
      url: 'https://kartalla.io/api',
      description: 'Production server',
    },
  ],
  paths: {
    '/surveys': {
      get: {
        parameters: [
          {
            name: 'filterByAuthored',
            in: 'query',
            description:
              'Show only surveys authored for the authenticated user',
            schema: {
              type: 'boolean',
            },
          },
          {
            name: 'filterByPublished',
            in: 'query',
            description: 'Show only published surveys',
            schema: {
              type: 'boolean',
            },
          },
        ],
        operationId: 'get-surveys',
        summary: 'Get all surveys',
        responses: {
          '200': {
            description: 'A list of surveys',
            content: {
              'application/json': {
                schema: z.array(apiSurveySchema),
              },
            },
          },
          '401': {
            description:
              'Unauthorized request if there is no authenticated user session',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/surveys/{surveyId}/submissions': {
      get: {
        operationId: 'get-survey-submissions',
        summary: 'Get all submissions for a survey',
        parameters: [
          {
            name: 'surveyId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The id of the survey',
          },
        ],
        responses: {
          '200': {
            description: 'A list of submissions for a survey',
            content: {
              'application/json': {
                schema: z.array(submissionSchema),
              },
            },
          },
          '401': {
            description:
              'Unauthorized request if there is no authenticated user session',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '500': {
            description:
              'Internal server error if invalid survey id is provided',
          },
        },
      },
    },
  },
});
