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
 * @interface AddUser
 */
export interface AddUser {

    /**
     * @type {string}
     * @memberof AddUser
     */
    username: string;

    /**
     * @type {string}
     * @memberof AddUser
     */
    name: string;

    /**
     * @type {string}
     * @memberof AddUser
     */
    email?: string;

    /**
     * @type {string}
     * @memberof AddUser
     */
    ip?: string;

    /**
     * @type {string}
     * @memberof AddUser
     */
    password: string;

    /**
     * @type {boolean}
     * @memberof AddUser
     */
    enabled?: boolean | null;

    /**
     * @type {string}
     * @memberof AddUser
     */
    teamId?: string;

    /**
     * @type {Array<string>}
     * @memberof AddUser
     */
    roles: Array<string>;
}
