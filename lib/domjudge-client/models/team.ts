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
 * @interface Team
 */
export interface Team {

    /**
     * @type {string}
     * @memberof Team
     */
    organizationId?: string | null;

    /**
     * @type {boolean}
     * @memberof Team
     */
    hidden?: boolean;

    /**
     * @type {Array<string>}
     * @memberof Team
     */
    groupIds?: Array<string>;

    /**
     * @type {string}
     * @memberof Team
     */
    affiliation?: string | null;

    /**
     * @type {string}
     * @memberof Team
     */
    nationality?: string | null;

    /**
     * @type {string}
     * @memberof Team
     */
    id?: string;

    /**
     * @type {string}
     * @memberof Team
     */
    icpcId?: string | null;

    /**
     * @type {string}
     * @memberof Team
     */
    name?: string;

    /**
     * @type {string}
     * @memberof Team
     */
    displayName?: string | null;

    /**
     * @type {string}
     * @memberof Team
     */
    publicDescription?: string | null;
}
