import { ConventionalGitClient, packagePrefix } from '@conventional-changelog/git-client';
import { loadPreset } from 'conventional-changelog-preset-loader';
import { isIterable } from './utils.js';
export { packagePrefix };
const VERSIONS = [
    'major',
    'minor',
    'patch'
];
/**
 * Bump suggester for conventional commits
 */
export class Bumper {
    gitClient;
    preset;
    whatBump;
    tagGetter;
    commitsGetter;
    constructor(cwdOrGitClient = process.cwd()) {
        this.gitClient = typeof cwdOrGitClient === 'string'
            ? new ConventionalGitClient(cwdOrGitClient)
            : cwdOrGitClient;
        this.preset = null;
        this.whatBump = null;
        this.tagGetter = () => this.getLastSemverTag();
        this.commitsGetter = () => this.getCommits();
    }
    getLastSemverTag(params) {
        return this.gitClient.getLastSemverTag(params);
    }
    async *getCommits(params, parserOptions) {
        yield* this.gitClient.getCommits({
            format: '%B%n-hash-%n%H',
            from: await this.tagGetter() || '',
            filterReverts: true,
            ...params
        }, parserOptions);
    }
    async getPreset() {
        const result = await this.preset;
        if (!result) {
            throw Error('Preset is not loaded or have incorrect exports');
        }
        return result;
    }
    /**
     * Load configs from a preset
     * @param preset
     * @returns this
     */
    loadPreset(preset) {
        this.preset = loadPreset(preset);
        this.whatBump = async (commits) => {
            const { whatBump } = await this.getPreset();
            return whatBump(commits);
        };
        this.tagGetter = async () => {
            const { tags } = await this.getPreset();
            return this.getLastSemverTag(tags);
        };
        this.commitsGetter = async function* commitsGetter() {
            const { commits, parser } = await this.getPreset();
            yield* this.getCommits(commits, parser);
        };
        return this;
    }
    /**
     * Set params to get the last semver tag
     * @param paramsOrTag - Params to get the last semver tag or a tag name
     * @returns this
     */
    tag(paramsOrTag) {
        if (typeof paramsOrTag === 'string') {
            this.tagGetter = () => paramsOrTag;
        }
        else {
            this.tagGetter = () => this.getLastSemverTag(paramsOrTag);
        }
        return this;
    }
    commits(paramsOrCommits, parserOptions) {
        if (isIterable(paramsOrCommits)) {
            this.commitsGetter = () => paramsOrCommits;
        }
        else {
            this.commitsGetter = () => this.getCommits(paramsOrCommits, parserOptions);
        }
        return this;
    }
    /**
     * Recommend a bump by `whatBump` function
     * @param whatBump - Function to recommend a bump from commits
     * @returns Bump recommendation
     */
    async bump(whatBump = this.whatBump) {
        if (typeof whatBump !== 'function') {
            throw Error('`whatBump` must be a function');
        }
        const commitsStream = this.commitsGetter();
        const commits = [];
        let commit;
        for await (commit of commitsStream) {
            commits.push(commit);
        }
        let result = await whatBump(commits);
        if (result && typeof result.level === 'number') {
            result.releaseType = VERSIONS[result.level];
        }
        else if (!result) {
            result = {};
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVtcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2J1bXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDZCxNQUFNLG9DQUFvQyxDQUFBO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQTtBQUVqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQTtBQUV4QixNQUFNLFFBQVEsR0FBRztJQUNmLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztDQUNDLENBQUE7QUFFVjs7R0FFRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBQ0EsU0FBUyxDQUF1QjtJQUN6QyxNQUFNLENBQXdCO0lBQzlCLFFBQVEsQ0FBMkI7SUFDbkMsU0FBUyxDQUF1QztJQUNoRCxhQUFhLENBQWdEO0lBRXJFLFlBQVksaUJBQWlELE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGNBQWMsS0FBSyxRQUFRO1lBQ2pELENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLGNBQWMsQ0FBQztZQUMzQyxDQUFDLENBQUMsY0FBYyxDQUFBO1FBRWxCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDOUMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE1BQXFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRU8sS0FBSyxDQUFBLENBQUUsVUFBVSxDQUN2QixNQUFrQyxFQUNsQyxhQUFtQztRQUVuQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUMvQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLElBQUksRUFBRSxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO1lBQ2xDLGFBQWEsRUFBRSxJQUFJO1lBQ25CLEdBQUcsTUFBTTtTQUNWLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUVoQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtTQUM5RDtRQUVELE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQ1IsTUFBeUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQThCLE1BQU0sQ0FBQyxDQUFBO1FBRTdELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUUzQyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzFCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUV2QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwQyxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsYUFBYTtZQUNoRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBRWxELEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3pDLENBQUMsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxHQUFHLENBQUMsV0FBa0Q7UUFDcEQsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUE7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzFEO1FBRUQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBZUQsT0FBTyxDQUNMLGVBQXFGLEVBQ3JGLGFBQW1DO1FBRW5DLElBQUksVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFBO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1NBQzNFO1FBRUQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRO1FBQ2pDLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLE1BQU0sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7U0FDN0M7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDMUMsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFBO1FBQzVCLElBQUksTUFBYyxDQUFBO1FBRWxCLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxhQUFhLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNyQjtRQUVELElBQUksTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBDLElBQUksTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVDO2FBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixNQUFNLEdBQUcsRUFBRSxDQUFBO1NBQ1o7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUM7Q0FDRiJ9