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

import { ImageList } from "./image-list";
import { Photo } from "./photo";
import { Team } from "./team";

/**
 *
 *
 * @export
 * @interface InlineResponse20013
 */
export interface InlineResponse20013 extends Team {
  /**
   * @type {ImageList}
   * @memberof InlineResponse20013
   */
  photo?: ImageList;
}
