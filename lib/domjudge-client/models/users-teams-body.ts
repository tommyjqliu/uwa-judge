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
 * @interface UsersTeamsBody
 */
export interface UsersTeamsBody {

    /**
     * The teams.tsv files to import.
     *
     * @type {Blob}
     * @memberof UsersTeamsBody
     */
    tsv?: Blob;

    /**
     * The teams.json files to import.
     *
     * @type {Blob}
     * @memberof UsersTeamsBody
     */
    json?: Blob;
}
