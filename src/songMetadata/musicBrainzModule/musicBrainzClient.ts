/**
 * ----------------------------------------------
 * Tried searching for already existing packages for this.
 * Investigation notes:
 * - https://www.npmjs.com/package/musicbrainz-api
 *     Looks promising, although...
 *     Types are not all correct, some are missing, others that should be optional are required.
 *     Doesn't allow to search for recordings.
 * - https://www.npmjs.com/package/musicbrainz-search-client
 *     Doesn't have description and could not find github for it. I don't trust it.
 * - https://www.npmjs.com/package/node-musicbrainz-search-client
 *     Same.
 * - https://www.npmjs.com/package/musicbrainz
 *     No Typescript typings.
 *     Converts from xml (the API supports json format)
 *     Next one is newer and cleaner looking
 * - https://www.npmjs.com/package/nodebrainz
 *     No Typescript typings.
 *     But so far the best one.
 * ----------------------------------------------
 * Decided to make my own version, since it's not used widely
 * For this specific use case this will do.
 */

import { SearchRecordingsResult } from './musicBrainzResponseTypes';

export enum SearchReleasesFields {
    artistId = 'arid', // artist id
    artistNameOnRecording = 'artist', // artist name is name(s) as it appears on the recording
    artistName = 'artistname', // an artist on the recording, each artist added as a separate field
    creditName = 'creditname', // name credit on the recording, each artist added as a separate field
    commentDisambiguation = 'comment', // recording disambiguation comment
    country = 'country', // recording release country
    date = 'date', // recording release date
    durationMs = 'dur', // duration of track in milliseconds
    format = 'format', // recording release format
    isrc = 'isrc', // ISRC of recording
    trackNumberFreeText = 'number', // free text track number
    position = 'position', // the medium that the recording should be found on, first medium is position 1
    primaryType = 'primarytype', // primary type of the release group (album, single, ep, other)
    qdur = 'qdur', // quantized duration (duration / 2000)
    recordingId = 'rid', // recording id
    recordingName = 'recording', // name of recording or a track associated with the recording
    recordingAccent = 'recordingaccent', // name of the recording with any accent characters retained
    releaseId = 'reid', // release id
    releaseName = 'release', // release name
    releaseGroupId = 'rgid', // release group id
    secondaryType = 'secondarytype', // secondary type of the release group (audiobook, compilation, interview, live, remix soundtrack, spokenword)
    status = 'status', // Release status (official, promotion, Bootleg, Pseudo-Release)
    trackId = 'tid', // track id
    trackNumberOnMedium = 'tnum', // track number on medium
    tracksCount = 'tracks', // number of tracks in the medium on release
    tracksCountOnRelease = 'tracksrelease', // number of tracks on release as a whole
    tag = 'tag', // folksonomy tag
    type = 'type', // type of the release group, old type mapping for when we did not have separate primary and secondary types or use standalone for standalone recordings
    video = 'video', // true to only show video tracks
}

export type SearchReleasesCriteria = {
    field: SearchReleasesFields;
    value: string;
};

class MusicBrainzUrlHelper {
    public static getSearchReleasesQuery<T>(
        searchFields: SearchReleasesCriteria[],
    ): string {
        return `?query=${searchFields.map((f) => {
            return `${f.field}:"${encodeURIComponent(f.value)}"`;
        })}`;
    }

    public static getGeneralQueryString(
        offset?: number,
        limit?: number,
    ): string {
        let result = '';
        if (offset !== undefined) {
            result += `&offset=${offset}`;
        }
        if (limit !== undefined) {
            result += `&limit=${limit}`;
        }
        result += '&fmt=json';
        return result;
    }
}

class MusicBrainzClient {
    private apiEndpoint = 'https://musicbrainz.org/ws/2/';
    /**
     * @param searchForCriteria query parameters to search for.
     * @param limit how many entries should be returned. Only values between 1 and 100 (both inclusive) are allowed. If not given, this defaults to 25.
     * @param offset search results starting at a given offset. Used for paging through more than one page of results.
     */
    public async searchReleases(
        searchForCriteria: SearchReleasesCriteria[],
        limit?: number,
        offset?: number,
    ): Promise<SearchRecordingsResult> {
        const searchForQuery = MusicBrainzUrlHelper.getSearchReleasesQuery(searchForCriteria);
        const generalQueryString = MusicBrainzUrlHelper.getGeneralQueryString(offset, limit);
        const endpoint = `${this.apiEndpoint}recording${searchForQuery}${generalQueryString}`;

        const response = await fetch(endpoint, {
            method: 'GET',
        });

        const resultObj = (await response.json()) as SearchRecordingsResult;
        return resultObj;
    }
}
export const musicBrainzClient = new MusicBrainzClient();
