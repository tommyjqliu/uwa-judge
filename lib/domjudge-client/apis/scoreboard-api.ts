/* tslint:disable */
/* eslint-disable */
/**
 * DOMjudge
 * DOMjudge API v4
 *
 * OpenAPI spec version: 8.2.2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { InlineResponse400 } from '../models';
import { Scoreboard } from '../models';
/**
 * ScoreboardApi - axios parameter creator
 * @export
 */
export const ScoreboardApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get the scoreboard for this contest.
         * @param {string} cid The contest ID
         * @param {boolean} [allteams] Also show invisible teams. Requires jury privileges
         * @param {number} [category] Get the scoreboard for only this category
         * @param {string} [country] Get the scoreboard for only this country (in ISO 3166-1 alpha-3 format)
         * @param {number} [affiliation] Get the scoreboard for only this affiliation
         * @param {boolean} [_public] Show publicly visible scoreboard, even for users with more permissions
         * @param {number} [sortorder] The sort order to get the scoreboard for. If not given, uses the lowest sortorder
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV4AppApiScoreboardGetscoreboard: async (cid: string, allteams?: boolean, category?: number, country?: string, affiliation?: number, _public?: boolean, sortorder?: number, strict?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'cid' is not null or undefined
            if (cid === null || cid === undefined) {
                throw new RequiredError('cid','Required parameter cid was null or undefined when calling getV4AppApiScoreboardGetscoreboard.');
            }
            const localVarPath = `/api/v4/contests/{cid}/scoreboard`
                .replace(`{${"cid"}}`, encodeURIComponent(String(cid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            if (allteams !== undefined) {
                localVarQueryParameter['allteams'] = allteams;
            }

            if (category !== undefined) {
                localVarQueryParameter['category'] = category;
            }

            if (country !== undefined) {
                localVarQueryParameter['country'] = country;
            }

            if (affiliation !== undefined) {
                localVarQueryParameter['affiliation'] = affiliation;
            }

            if (_public !== undefined) {
                localVarQueryParameter['public'] = _public;
            }

            if (sortorder !== undefined) {
                localVarQueryParameter['sortorder'] = sortorder;
            }

            if (strict !== undefined) {
                localVarQueryParameter['strict'] = strict;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ScoreboardApi - functional programming interface
 * @export
 */
export const ScoreboardApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get the scoreboard for this contest.
         * @param {string} cid The contest ID
         * @param {boolean} [allteams] Also show invisible teams. Requires jury privileges
         * @param {number} [category] Get the scoreboard for only this category
         * @param {string} [country] Get the scoreboard for only this country (in ISO 3166-1 alpha-3 format)
         * @param {number} [affiliation] Get the scoreboard for only this affiliation
         * @param {boolean} [_public] Show publicly visible scoreboard, even for users with more permissions
         * @param {number} [sortorder] The sort order to get the scoreboard for. If not given, uses the lowest sortorder
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiScoreboardGetscoreboard(cid: string, allteams?: boolean, category?: number, country?: string, affiliation?: number, _public?: boolean, sortorder?: number, strict?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Scoreboard>>> {
            const localVarAxiosArgs = await ScoreboardApiAxiosParamCreator(configuration).getV4AppApiScoreboardGetscoreboard(cid, allteams, category, country, affiliation, _public, sortorder, strict, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ScoreboardApi - factory interface
 * @export
 */
export const ScoreboardApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get the scoreboard for this contest.
         * @param {string} cid The contest ID
         * @param {boolean} [allteams] Also show invisible teams. Requires jury privileges
         * @param {number} [category] Get the scoreboard for only this category
         * @param {string} [country] Get the scoreboard for only this country (in ISO 3166-1 alpha-3 format)
         * @param {number} [affiliation] Get the scoreboard for only this affiliation
         * @param {boolean} [_public] Show publicly visible scoreboard, even for users with more permissions
         * @param {number} [sortorder] The sort order to get the scoreboard for. If not given, uses the lowest sortorder
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiScoreboardGetscoreboard(cid: string, allteams?: boolean, category?: number, country?: string, affiliation?: number, _public?: boolean, sortorder?: number, strict?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<Scoreboard>> {
            return ScoreboardApiFp(configuration).getV4AppApiScoreboardGetscoreboard(cid, allteams, category, country, affiliation, _public, sortorder, strict, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ScoreboardApi - object-oriented interface
 * @export
 * @class ScoreboardApi
 * @extends {BaseAPI}
 */
export class ScoreboardApi extends BaseAPI {
    /**
     * 
     * @summary Get the scoreboard for this contest.
     * @param {string} cid The contest ID
     * @param {boolean} [allteams] Also show invisible teams. Requires jury privileges
     * @param {number} [category] Get the scoreboard for only this category
     * @param {string} [country] Get the scoreboard for only this country (in ISO 3166-1 alpha-3 format)
     * @param {number} [affiliation] Get the scoreboard for only this affiliation
     * @param {boolean} [_public] Show publicly visible scoreboard, even for users with more permissions
     * @param {number} [sortorder] The sort order to get the scoreboard for. If not given, uses the lowest sortorder
     * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScoreboardApi
     */
    public async getV4AppApiScoreboardGetscoreboard(cid: string, allteams?: boolean, category?: number, country?: string, affiliation?: number, _public?: boolean, sortorder?: number, strict?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<Scoreboard>> {
        return ScoreboardApiFp(this.configuration).getV4AppApiScoreboardGetscoreboard(cid, allteams, category, country, affiliation, _public, sortorder, strict, options).then((request) => request(this.axios, this.basePath));
    }
}