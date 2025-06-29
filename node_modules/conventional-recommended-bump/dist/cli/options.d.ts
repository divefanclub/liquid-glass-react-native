import type { ParserStreamOptions } from 'conventional-commits-parser';
import type { GetCommitsParams, GetSemverTagsParams, Params } from '@conventional-changelog/git-client';
export declare function parseTagsOptions(options: Record<string, unknown>): GetSemverTagsParams & Params | null;
export declare function parseCommitsOptions(options: Record<string, unknown>): GetCommitsParams & Params | null;
export declare function parseParserOptions(options: Record<string, unknown>): ParserStreamOptions | null;
//# sourceMappingURL=options.d.ts.map