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

import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
import { InlineResponse400 } from "../models";
/**
 * ExecutablesApi - axios parameter creator
 * @export
 */
export const ExecutablesApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary Get the executable with the given ID.
     * @param {string} id The ID of the entity
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getV4AppApiExecutableSingle: async (
      id: string,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling getV4AppApiExecutableSingle.",
        );
      }
      const localVarPath = `/api/v4/executables/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      if (configuration && (configuration.username || configuration.password)) {
        localVarRequestOptions["auth"] = {
          username: configuration.username,
          password: configuration.password,
        };
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * ExecutablesApi - functional programming interface
 * @export
 */
export const ExecutablesApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Get the executable with the given ID.
     * @param {string} id The ID of the entity
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiExecutableSingle(
      id: string,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<string>>
    > {
      const localVarAxiosArgs = await ExecutablesApiAxiosParamCreator(
        configuration,
      ).getV4AppApiExecutableSingle(id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * ExecutablesApi - factory interface
 * @export
 */
export const ExecutablesApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     *
     * @summary Get the executable with the given ID.
     * @param {string} id The ID of the entity
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiExecutableSingle(
      id: string,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<string>> {
      return ExecutablesApiFp(configuration)
        .getV4AppApiExecutableSingle(id, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * ExecutablesApi - object-oriented interface
 * @export
 * @class ExecutablesApi
 * @extends {BaseAPI}
 */
export class ExecutablesApi extends BaseAPI {
  /**
   *
   * @summary Get the executable with the given ID.
   * @param {string} id The ID of the entity
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExecutablesApi
   */
  public async getV4AppApiExecutableSingle(
    id: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<string>> {
    return ExecutablesApiFp(this.configuration)
      .getV4AppApiExecutableSingle(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
