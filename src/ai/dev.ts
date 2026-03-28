import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-architecture-for-risks.ts';
import '@/ai/flows/generate-ci-cd-pipeline.ts';
import '@/ai/flows/validate-and-suggest-checklists.ts';
import '@/ai/flows/suggest-architecture-refinements-flow.ts';