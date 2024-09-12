import { z } from 'zod';
import yaml from 'js-yaml';
import { ParamsInvalidError } from '@/lib/error';

const limitsSchema = z.object({
    time_multiplier: z.number().optional().default(5),
    time_safety_margin: z.number().optional().default(2),
    memory: z.number().optional().default(2048),
    output: z.number().optional().default(8),
    code: z.number().optional().default(128),
    compilation_time: z.number().optional().default(60),
    compilation_memory: z.number().optional().default(2048),
    validation_time: z.number().optional().default(60),
    validation_memory: z.number().optional().default(2048),
    validation_output: z.number().optional().default(8),
});

export const legacySchema = z.object({
    problem_format_version: z.string().optional().default('legacy'),
    type: z.string().optional().default('pass-fail'),
    name: z.string().optional(),
    uuid: z.string().optional(),
    author: z.string().optional(),
    source: z.string().optional(),
    source_url: z.string().optional(),
    license: z.string().optional().default('unknown'),
    rights_owner: z.string().optional(),
    limits: limitsSchema.optional(),
    validation: z.string().optional().default('default'),
    validator_flags: z.string().optional(),
    scoring: z.object({
        objective: z.string().optional().default('max'),
        show_test_data_groups: z.boolean().optional().default(false),
    }).optional(),
    keywords: z.string().optional(),
});
// Following is disabled because it is not widely supported
// .refine((data) => !data.license || ['unknown', 'public domain'].includes(data.license) || !!data.rights_owner, "Values other than unknown or public domain require rights_owner to have a value");

export function parseLegacyMetadata(yamlString: string): LegacyMetadata {
    try {
        return legacySchema.parse(yaml.load(yamlString));
    } catch (e) {
        throw new ParamsInvalidError(`problem.yaml is invalid: ${yamlString} ${e.message}`);
    }
}

export type LegacyMetadata = z.infer<typeof legacySchema>;