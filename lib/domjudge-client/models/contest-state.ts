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
 * @interface ContestState
 */
export interface ContestState {

    /**
     * @type {Date}
     * @memberof ContestState
     */
    started?: Date | null;

    /**
     * @type {Date}
     * @memberof ContestState
     */
    ended?: Date | null;

    /**
     * @type {Date}
     * @memberof ContestState
     */
    frozen?: Date | null;

    /**
     * @type {Date}
     * @memberof ContestState
     */
    thawed?: Date | null;

    /**
     * @type {Date}
     * @memberof ContestState
     */
    finalized?: Date | null;

    /**
     * @type {Date}
     * @memberof ContestState
     */
    endOfUpdates?: Date | null;
}