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
 * @interface JudgementType
 */
export interface JudgementType {

    /**
     * @type {string}
     * @memberof JudgementType
     */
    id?: string;

    /**
     * @type {string}
     * @memberof JudgementType
     */
    name?: string;

    /**
     * @type {boolean}
     * @memberof JudgementType
     */
    penalty?: boolean;

    /**
     * @type {boolean}
     * @memberof JudgementType
     */
    solved?: boolean;
}