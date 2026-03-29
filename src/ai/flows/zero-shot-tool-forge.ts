'use server';
/**
 * @fileOverview AI flow for dynamically creating a tool (code/script) based on a novel environment description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ToolForgeInputSchema = z.object({
  environmentDescription: z.string().describe('Detailed description of the target system, API docs, or novel software environment.'),
  taskGoal: z.string().describe('The specific action the system needs to perform within this environment.'),
});

const ToolForgeOutputSchema = z.object({
  generatedCode: z.string().describe('The Python or JS code generated to interact with the novel system.'),
  reverseEngineeringReport: z.string().describe('Analysis of how the AI understood the target system.'),
  safetyAudit: z.string().describe('Verification of the generated code against safety protocols.'),
});

export type ToolForgeInput = z.infer<typeof ToolForgeInputSchema>;
export type ToolForgeOutput = z.infer<typeof ToolForgeOutputSchema>;

export async function forgeDynamicTool(input: ToolForgeInput): Promise<ToolForgeOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    input: input,
    output: {schema: ToolForgeOutputSchema},
    prompt: `You are the Tool Forge for a Liquid Intelligence Network. 
    You have encountered a novel environment you haven't been integrated with before.
    Read the description of the environment and the task goal.
    Generate the necessary code to perform the task.
    Also provide a brief report on your reverse engineering process and a safety audit.

    Environment: {{{environmentDescription}}}
    Task Goal: {{{taskGoal}}}`,
  });
  return output!;
}
