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
 * @interface JudgementExtraFields
 */
export interface JudgementExtraFields {

    /**
     * @type {string}
     * @memberof JudgementExtraFields
     */
    judgement_type_id?: string | null;

    /**
     * @type {string}
     * @memberof JudgementExtraFields
     */
    judgehost?: string;

    /**
     * @type {number}
     * @memberof JudgementExtraFields
     */
    max_run_time?: number | null;
}
