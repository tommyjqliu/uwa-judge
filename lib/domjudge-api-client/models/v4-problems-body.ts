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
 * @interface V4ProblemsBody
 */
export interface V4ProblemsBody {

    /**
     * The problem archive to import
     *
     * @type {Blob}
     * @memberof V4ProblemsBody
     */
    zip: Blob;

    /**
     * Optional: problem id to update.
     *
     * @type {string}
     * @memberof V4ProblemsBody
     */
    problem?: string;
}