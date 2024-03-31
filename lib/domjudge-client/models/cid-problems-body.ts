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
 * @interface CidProblemsBody
 */
export interface CidProblemsBody {

    /**
     * The problem archive to import
     *
     * @type {Blob}
     * @memberof CidProblemsBody
     */
    zip: Blob;

    /**
     * Optional: problem id to update.
     *
     * @type {string}
     * @memberof CidProblemsBody
     */
    problem?: string;
}
