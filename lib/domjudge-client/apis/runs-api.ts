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
import { InlineResponse20011 } from '../models';
import { InlineResponse400 } from '../models';
import { JudgingRun, RunExtraFields } from '../models';
/**
 * RunsApi - axios parameter creator
 * @export
 */
export const RunsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get all the runs for this contest.
         * @param {string} cid The contest ID
         * @param {Array<string>} [ids] Filter the objects to get on this list of ID&#x27;s
         * @param {string} [firstId] Only show runs starting from this ID
         * @param {string} [lastId] Only show runs until this ID
         * @param {string} [judgingId] Only show runs for this judgement
         * @param {number} [limit] Limit the number of returned runs to this amount
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV4AppApiRunList: async (cid: string, ids?: Array<string>, firstId?: string, lastId?: string, judgingId?: string, limit?: number, strict?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'cid' is not null or undefined
            if (cid === null || cid === undefined) {
                throw new RequiredError('cid','Required parameter cid was null or undefined when calling getV4AppApiRunList.');
            }
            const localVarPath = `/api/v4/contests/{cid}/runs`
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

            if (ids) {
                localVarQueryParameter['ids[]'] = ids;
            }

            if (firstId !== undefined) {
                localVarQueryParameter['first_id'] = firstId;
            }

            if (lastId !== undefined) {
                localVarQueryParameter['last_id'] = lastId;
            }

            if (judgingId !== undefined) {
                localVarQueryParameter['judging_id'] = judgingId;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
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
        /**
         * 
         * @summary Get the given run for this contest.
         * @param {string} id The ID of the entity
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV4AppApiRunSingle: async (id: string, cid: string, strict?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getV4AppApiRunSingle.');
            }
            // verify required parameter 'cid' is not null or undefined
            if (cid === null || cid === undefined) {
                throw new RequiredError('cid','Required parameter cid was null or undefined when calling getV4AppApiRunSingle.');
            }
            const localVarPath = `/api/v4/contests/{cid}/runs/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)))
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
 * RunsApi - functional programming interface
 * @export
 */
export const RunsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get all the runs for this contest.
         * @param {string} cid The contest ID
         * @param {Array<string>} [ids] Filter the objects to get on this list of ID&#x27;s
         * @param {string} [firstId] Only show runs starting from this ID
         * @param {string} [lastId] Only show runs until this ID
         * @param {string} [judgingId] Only show runs for this judgement
         * @param {number} [limit] Limit the number of returned runs to this amount
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiRunList(cid: string, ids?: Array<string>, firstId?: string, lastId?: string, judgingId?: string, limit?: number, strict?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<JudgingRun & RunExtraFields>>>> {
            const localVarAxiosArgs = await RunsApiAxiosParamCreator(configuration).getV4AppApiRunList(cid, ids, firstId, lastId, judgingId, limit, strict, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get the given run for this contest.
         * @param {string} id The ID of the entity
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiRunSingle(id: string, cid: string, strict?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse20011>>> {
            const localVarAxiosArgs = await RunsApiAxiosParamCreator(configuration).getV4AppApiRunSingle(id, cid, strict, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RunsApi - factory interface
 * @export
 */
export const RunsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get all the runs for this contest.
         * @param {string} cid The contest ID
         * @param {Array<string>} [ids] Filter the objects to get on this list of ID&#x27;s
         * @param {string} [firstId] Only show runs starting from this ID
         * @param {string} [lastId] Only show runs until this ID
         * @param {string} [judgingId] Only show runs for this judgement
         * @param {number} [limit] Limit the number of returned runs to this amount
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiRunList(cid: string, ids?: Array<string>, firstId?: string, lastId?: string, judgingId?: string, limit?: number, strict?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<JudgingRun & RunExtraFields>>> {
            return RunsApiFp(configuration).getV4AppApiRunList(cid, ids, firstId, lastId, judgingId, limit, strict, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get the given run for this contest.
         * @param {string} id The ID of the entity
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiRunSingle(id: string, cid: string, strict?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse20011>> {
            return RunsApiFp(configuration).getV4AppApiRunSingle(id, cid, strict, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RunsApi - object-oriented interface
 * @export
 * @class RunsApi
 * @extends {BaseAPI}
 */
export class RunsApi extends BaseAPI {
    /**
     * 
     * @summary Get all the runs for this contest.
     * @param {string} cid The contest ID
     * @param {Array<string>} [ids] Filter the objects to get on this list of ID&#x27;s
     * @param {string} [firstId] Only show runs starting from this ID
     * @param {string} [lastId] Only show runs until this ID
     * @param {string} [judgingId] Only show runs for this judgement
     * @param {number} [limit] Limit the number of returned runs to this amount
     * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RunsApi
     */
    public async getV4AppApiRunList(cid: string, ids?: Array<string>, firstId?: string, lastId?: string, judgingId?: string, limit?: number, strict?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<JudgingRun & RunExtraFields>>> {
        return RunsApiFp(this.configuration).getV4AppApiRunList(cid, ids, firstId, lastId, judgingId, limit, strict, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Get the given run for this contest.
     * @param {string} id The ID of the entity
     * @param {string} cid The contest ID
     * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RunsApi
     */
    public async getV4AppApiRunSingle(id: string, cid: string, strict?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse20011>> {
        return RunsApiFp(this.configuration).getV4AppApiRunSingle(id, cid, strict, options).then((request) => request(this.axios, this.basePath));
    }
}
