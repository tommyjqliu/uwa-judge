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

import { InlineResponse200Endpoints } from "./inline-response200-endpoints";

/**
 *
 *
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
  /**
   * @type {Array<string>}
   * @memberof InlineResponse200
   */
  capabilities?: Array<string>;

  /**
   * @type {Array<InlineResponse200Endpoints>}
   * @memberof InlineResponse200
   */
  endpoints?: Array<InlineResponse200Endpoints>;
}
