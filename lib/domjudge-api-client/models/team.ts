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
 * @interface Team
 */
export interface Team {
  /**
   * @type {string}
   * @memberof Team
   */
  organization_id?: string | null;

  /**
   * @type {boolean}
   * @memberof Team
   */
  hidden?: boolean;

  /**
   * @type {Array<string>}
   * @memberof Team
   */
  group_ids?: Array<string>;

  /**
   * @type {string}
   * @memberof Team
   */
  affiliation?: string | null;

  /**
   * @type {string}
   * @memberof Team
   */
  nationality?: string | null;

  /**
   * @type {string}
   * @memberof Team
   */
  id?: string;

  /**
   * @type {string}
   * @memberof Team
   */
  icpc_id?: string | null;

  /**
   * @type {string}
   * @memberof Team
   */
  name?: string;

  /**
   * @type {string}
   * @memberof Team
   */
  display_name?: string | null;

  /**
   * @type {string}
   * @memberof Team
   */
  public_description?: string | null;
}
