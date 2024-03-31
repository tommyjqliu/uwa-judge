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
 * DOMjudge information
 *
 * @export
 * @interface InlineResponse2005Domjudge
 */
export interface InlineResponse2005Domjudge {

    /**
     * Version of the API
     *
     * @type {number}
     * @memberof InlineResponse2005Domjudge
     */
    apiVersion?: number;

    /**
     * Version of DOMjudge
     *
     * @type {string}
     * @memberof InlineResponse2005Domjudge
     */
    domjudgeVersion?: string;

    /**
     * Environment DOMjudge is running in
     *
     * @type {string}
     * @memberof InlineResponse2005Domjudge
     */
    environment?: string;

    /**
     * URL to DOMjudge API docs
     *
     * @type {string}
     * @memberof InlineResponse2005Domjudge
     */
    docUrl?: string;
}
