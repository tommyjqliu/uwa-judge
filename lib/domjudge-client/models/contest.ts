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
 * @interface Contest
 */
export interface Contest {

    /**
     * @type {string}
     * @memberof Contest
     */
    formal_name?: string;

    /**
     * @type {number}
     * @memberof Contest
     */
    penalty_time?: number;

    /**
     * @type {Date}
     * @memberof Contest
     */
    start_time?: Date;

    /**
     * @type {Date}
     * @memberof Contest
     */
    end_time?: Date;

    /**
     * @type {string}
     * @memberof Contest
     */
    duration?: string;

    /**
     * @type {string}
     * @memberof Contest
     */
    scoreboard_freeze_duration?: string | null;

    /**
     * @type {string}
     * @memberof Contest
     */
    id?: string;

    /**
     * @type {string}
     * @memberof Contest
     */
    external_id?: string;

    /**
     * @type {string}
     * @memberof Contest
     */
    name: string;

    /**
     * @type {string}
     * @memberof Contest
     */
    shortname: string;

    /**
     * @type {boolean}
     * @memberof Contest
     */
    allow_submit?: boolean;

    /**
     * @type {string}
     * @memberof Contest
     */
    warning_message?: string | null;
}
