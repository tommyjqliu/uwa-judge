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

import {
    
} from ".";

/**
 * 
 *
 * @export
 * @interface UsersGroupsBody
 */
export interface UsersGroupsBody {

    /**
     * The groups.tsv files to import.
     *
     * @type {Blob}
     * @memberof UsersGroupsBody
     */
    tsv?: Blob;

    /**
     * The groups.json files to import.
     *
     * @type {Blob}
     * @memberof UsersGroupsBody
     */
    json?: Blob;
}
