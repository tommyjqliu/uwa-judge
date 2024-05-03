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
 * @interface CidSubmissionsBody
 */
export interface CidSubmissionsBody {

    /**
     * The problem to submit a solution for
     *
     * @type {string}
     * @memberof CidSubmissionsBody
     */
    problem: string;

    /**
     * The language to submit a solution in
     *
     * @type {string}
     * @memberof CidSubmissionsBody
     */
    language: string;

    /**
     * The file(s) to submit
     *
     * @type {Array<Blob>}
     * @memberof CidSubmissionsBody
     */
    code: Array<Blob>;

    /**
     * The entry point for the submission. Required for languages requiring an entry point
     *
     * @type {string}
     * @memberof CidSubmissionsBody
     */
    entry_point?: string;
}