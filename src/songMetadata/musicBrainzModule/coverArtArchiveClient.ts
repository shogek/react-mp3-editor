import { ReleaseImagesResponse } from "./musicBrainzResponseTypes";

class CoverArtArchiveClient {
    private apiEndpoint = 'http://coverartarchive.org/';

    public async getCoversForRelease(releaseId: string) {
        // GET http://coverartarchive.org/release/0eb217cd-de71-4112-bf86-ec349a56669b/

        const endpoint = `${this.apiEndpoint}release/${releaseId}`;
        const response = await fetch(endpoint, {
            method: 'GET',
        });

        const resultObj = (await response.json()) as ReleaseImagesResponse;
        return resultObj;
    }
}
export const coverArtArchiveClient = new CoverArtArchiveClient();
