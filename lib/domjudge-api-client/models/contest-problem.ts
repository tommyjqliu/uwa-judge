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

import { StatementList } from "./statement-list";

/**
 *
 *
 * @export
 * @interface ContestProblem
 */
export interface ContestProblem {
  /**
   * @type {string}
   * @memberof ContestProblem
   */
  id?: string;

  /**
   * @type {string}
   * @memberof ContestProblem
   */
  label?: string;

  /**
   * @type {string}
   * @memberof ContestProblem
   */
  short_name?: string;

  /**
   * @type {string}
   * @memberof ContestProblem
   */
  name?: string;

  /**
   * @type {number}
   * @memberof ContestProblem
   */
  ordinal?: number;

  /**
   * @type {string}
   * @memberof ContestProblem
   */
  rgb?: string;

  /**
   * @type {string}
   * @memberof ContestProblem
   */
  color?: string;

  /**
   * @type {number}
   * @memberof ContestProblem
   */
  time_limit?: number;

  /**
   * @type {number}
   * @memberof ContestProblem
   */
  test_data_count?: number;

  /**
   * @type {StatementList}
   * @memberof ContestProblem
   */
  statement?: StatementList;
}
