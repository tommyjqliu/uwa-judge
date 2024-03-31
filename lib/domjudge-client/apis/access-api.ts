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
import { InlineResponse200 } from '../models';
import { InlineResponse400 } from '../models';
/**
 * AccessApi - axios parameter creator
 * @export
 */
export const AccessApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get access information
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV4AppApiAccessGetstatus: async (cid: string, strict?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'cid' is not null or undefined
            if (cid === null || cid === undefined) {
                throw new RequiredError('cid','Required parameter cid was null or undefined when calling getV4AppApiAccessGetstatus.');
            }
            const localVarPath = `/api/v4/contests/{cid}/access`
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
 * AccessApi - functional programming interface
 * @export
 */
export const AccessApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get access information
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiAccessGetstatus(cid: string, strict?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse200>>> {
            const localVarAxiosArgs = await AccessApiAxiosParamCreator(configuration).getV4AppApiAccessGetstatus(cid, strict, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AccessApi - factory interface
 * @export
 */
export const AccessApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get access information
         * @param {string} cid The contest ID
         * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV4AppApiAccessGetstatus(cid: string, strict?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse200>> {
            return AccessApiFp(configuration).getV4AppApiAccessGetstatus(cid, strict, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AccessApi - object-oriented interface
 * @export
 * @class AccessApi
 * @extends {BaseAPI}
 */
export class AccessApi extends BaseAPI {
    /**
     * 
     * @summary Get access information
     * @param {string} cid The contest ID
     * @param {boolean} [strict] Whether to only include CCS compliant properties in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccessApi
     */
    public async getV4AppApiAccessGetstatus(cid: string, strict?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse200>> {
        return AccessApiFp(this.configuration).getV4AppApiAccessGetstatus(cid, strict, options).then((request) => request(this.axios, this.basePath));
    }
}
