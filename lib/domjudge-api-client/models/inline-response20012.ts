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

import { ArchiveList } from './archive-list';
import { Files } from './files';
import { Submission } from './submission';


/**
 * 
 *
 * @export
 * @interface InlineResponse20012
 */
export interface InlineResponse20012 extends Submission {

    /**
     * @type {ArchiveList}
     * @memberof InlineResponse20012
     */
    files?: ArchiveList;
}