import type { ParserStreamOptions, Commit } from 'conventional-commits-parser';
import type { GetSemverTagsParams, GetCommitsParams, Params } from '@conventional-changelog/git-client';
import type { UnknownPresetCreatorParams, PresetParams } from 'conventional-changelog-preset-loader';
import { ConventionalGitClient, packagePrefix } from '@conventional-changelog/git-client';
export { packagePrefix };
/**
 * Bump suggester for conventional commits
 */
export declare class Bumper {
    private readonly gitClient;
    private preset;
    private whatBump;
    private tagGetter;
    private commitsGetter;
    constructor(cwdOrGitClient?: string | ConventionalGitClient);
    private getLastSemverTag;
    private getCommits;
    private getPreset;
    /**
     * Load configs from a preset
     * @param preset
     * @returns this
     */
    loadPreset<PresetCreatorParams extends UnknownPresetCreatorParams = UnknownPresetCreatorParams>(preset: PresetParams<PresetCreatorParams>): this;
    /**
     * Set params to get the last semver tag
     * @param paramsOrTag - Params to get the last semver tag or a tag name
     * @returns this
     */
    tag(paramsOrTag: GetSemverTagsParams & Params | string): this;
    /**
     * Set params to get commits since last release
     * @param params - Params to get commits since last release
     * @param parserOptions - Parser options
     * @returns this
     */
    commits(params: GetCommitsParams & Params, parserOptions?: ParserStreamOptions): this;
    /**
     * Set commits since last release
     * @param commits - Iterable or async iterable of commits
     * @returns this
     */
    commits(commits: Iterable<Commit> | AsyncIterable<Commit>): this;
    /**
     * Recommend a bump by `whatBump` function
     * @param whatBump - Function to recommend a bump from commits
     * @returns Bump recommendation
     */
    bump(whatBump?: ((commits: Commit[]) => Promise<import("./types.js").BumperRecommendation | null | undefined>) | null): Promise<import("./types.js").BumperRecommendation>;
}
//# sourceMappingURL=bumper.d.ts.map