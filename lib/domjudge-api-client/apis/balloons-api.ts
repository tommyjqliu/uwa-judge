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
import { Balloon } from "../models";
import { InlineResponse400 } from "../models";
/**
 * BalloonsApi - axios parameter creator
 * @export
 */
export const BalloonsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary Get all the balloons for this contest.
     * @param {string} cid The contest ID
     * @param {boolean} [todo] Only show balloons not handed out yet.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getV4AppApiBalloonList: async (
      cid: string,
      todo?: boolean,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'cid' is not null or undefined
      if (cid === null || cid === undefined) {
        throw new RequiredError(
          "cid",
          "Required parameter cid was null or undefined when calling getV4AppApiBalloonList.",
        );
      }
      const localVarPath = `/api/v4/contests/{cid}/balloons`.replace(
        `{${"cid"}}`,
        encodeURIComponent(String(cid)),
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

      if (todo !== undefined) {
        localVarQueryParameter["todo"] = todo;
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
    /**
     *
     * @summary Mark a specific balloon as done.
     * @param {number} balloonId The balloonId to mark as done.
     * @param {string} cid The contest ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postV4AppApiBalloonMarkdone: async (
      balloonId: number,
      cid: string,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'balloonId' is not null or undefined
      if (balloonId === null || balloonId === undefined) {
        throw new RequiredError(
          "balloonId",
          "Required parameter balloonId was null or undefined when calling postV4AppApiBalloonMarkdone.",
        );
      }
      // verify required parameter 'cid' is not null or undefined
      if (cid === null || cid === undefined) {
        throw new RequiredError(
          "cid",
          "Required parameter cid was null or undefined when calling postV4AppApiBalloonMarkdone.",
        );
      }
      const localVarPath = `/api/v4/contests/{cid}/balloons/{balloonId}/done`
        .replace(`{${"balloonId"}}`, encodeURIComponent(String(balloonId)))
        .replace(`{${"cid"}}`, encodeURIComponent(String(cid)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
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
 * BalloonsApi - functional programming interface
 * @export
 */
export const BalloonsApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Get all the balloons for this contest.
     * @param {string} cid The contest ID
     * @param {boolean} [todo] Only show balloons not handed out yet.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiBalloonList(
      cid: string,
      todo?: boolean,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<Array<Balloon>>>
    > {
      const localVarAxiosArgs = await BalloonsApiAxiosParamCreator(
        configuration,
      ).getV4AppApiBalloonList(cid, todo, options);
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
    /**
     *
     * @summary Mark a specific balloon as done.
     * @param {number} balloonId The balloonId to mark as done.
     * @param {string} cid The contest ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postV4AppApiBalloonMarkdone(
      balloonId: number,
      cid: string,
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await BalloonsApiAxiosParamCreator(
        configuration,
      ).postV4AppApiBalloonMarkdone(balloonId, cid, options);
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
 * BalloonsApi - factory interface
 * @export
 */
export const BalloonsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     *
     * @summary Get all the balloons for this contest.
     * @param {string} cid The contest ID
     * @param {boolean} [todo] Only show balloons not handed out yet.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiBalloonList(
      cid: string,
      todo?: boolean,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Array<Balloon>>> {
      return BalloonsApiFp(configuration)
        .getV4AppApiBalloonList(cid, todo, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Mark a specific balloon as done.
     * @param {number} balloonId The balloonId to mark as done.
     * @param {string} cid The contest ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postV4AppApiBalloonMarkdone(
      balloonId: number,
      cid: string,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return BalloonsApiFp(configuration)
        .postV4AppApiBalloonMarkdone(balloonId, cid, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * BalloonsApi - object-oriented interface
 * @export
 * @class BalloonsApi
 * @extends {BaseAPI}
 */
export class BalloonsApi extends BaseAPI {
  /**
   *
   * @summary Get all the balloons for this contest.
   * @param {string} cid The contest ID
   * @param {boolean} [todo] Only show balloons not handed out yet.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BalloonsApi
   */
  public async getV4AppApiBalloonList(
    cid: string,
    todo?: boolean,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Array<Balloon>>> {
    return BalloonsApiFp(this.configuration)
      .getV4AppApiBalloonList(cid, todo, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Mark a specific balloon as done.
   * @param {number} balloonId The balloonId to mark as done.
   * @param {string} cid The contest ID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BalloonsApi
   */
  public async postV4AppApiBalloonMarkdone(
    balloonId: number,
    cid: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return BalloonsApiFp(this.configuration)
      .postV4AppApiBalloonMarkdone(balloonId, cid, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
