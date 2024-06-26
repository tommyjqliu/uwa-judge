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
} from "@/lib/axios";
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
/**
 * MetricsApi - axios parameter creator
 * @export
 */
export const MetricsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary Metrics of this installation for use by Prometheus.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getV4AppApiMetricsPrometheus: async (
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v4/metrics/prometheus`;
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
 * MetricsApi - functional programming interface
 * @export
 */
export const MetricsApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Metrics of this installation for use by Prometheus.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiMetricsPrometheus(
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await MetricsApiAxiosParamCreator(
          configuration,
        ).getV4AppApiMetricsPrometheus(options);
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
 * MetricsApi - factory interface
 * @export
 */
export const MetricsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     *
     * @summary Metrics of this installation for use by Prometheus.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getV4AppApiMetricsPrometheus(
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return MetricsApiFp(configuration)
        .getV4AppApiMetricsPrometheus(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * MetricsApi - object-oriented interface
 * @export
 * @class MetricsApi
 * @extends {BaseAPI}
 */
export class MetricsApi extends BaseAPI {
  /**
   *
   * @summary Metrics of this installation for use by Prometheus.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MetricsApi
   */
  public async getV4AppApiMetricsPrometheus(
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return MetricsApiFp(this.configuration)
      .getV4AppApiMetricsPrometheus(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
