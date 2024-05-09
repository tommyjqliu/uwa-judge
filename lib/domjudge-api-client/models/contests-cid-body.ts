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

/**
 *
 *
 * @export
 * @interface ContestsCidBody
 */
export interface ContestsCidBody {
  /**
   * The ID of the contest to change the start time for
   *
   * @type {string}
   * @memberof ContestsCidBody
   */
  id: string;

  /**
   * The new start time of the contest
   *
   * @type {Date}
   * @memberof ContestsCidBody
   */
  start_time: Date;

  /**
   * Force overwriting the start_time even when in next 30s
   *
   * @type {boolean}
   * @memberof ContestsCidBody
   */
  force?: boolean;
}
