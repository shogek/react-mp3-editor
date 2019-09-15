import { ReleaseImagesResponse } from "./musicBrainzResponseTypes";

class CoverArtArchiveClient {
    private apiEndpoint = 'http://coverartarchive.org/';

    public async getCoversForRelease(releaseId: string): Promise<ReleaseImagesResponse> {
        const endpoint = `${this.apiEndpoint}release/${releaseId}`;
        const response = await fetch(endpoint, {
            method: 'GET',
        });

        const resultObj = (await response.json()) as ReleaseImagesResponse;
        return resultObj;
    }
}
export const coverArtArchiveClient = new CoverArtArchiveClient();
