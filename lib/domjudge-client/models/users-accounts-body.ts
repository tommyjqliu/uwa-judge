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
 * @interface UsersAccountsBody
 */
export interface UsersAccountsBody {

    /**
     * The accounts.tsv files to import.
     *
     * @type {Blob}
     * @memberof UsersAccountsBody
     */
    tsv?: Blob;

    /**
     * The accounts.json files to import.
     *
     * @type {Blob}
     * @memberof UsersAccountsBody
     */
    json?: Blob;

    /**
     * The accounts.yaml files to import.
     *
     * @type {Blob}
     * @memberof UsersAccountsBody
     */
    yaml?: Blob;
}