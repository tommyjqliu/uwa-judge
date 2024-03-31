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
 * @interface HostnameJudgetaskidBody
 */
export interface HostnameJudgetaskidBody {

    /**
     * Whether compilation was successful
     *
     * @type {boolean}
     * @memberof HostnameJudgetaskidBody
     */
    compileSuccess?: boolean;

    /**
     * The compile output
     *
     * @type {string}
     * @memberof HostnameJudgetaskidBody
     */
    outputCompile?: string;

    /**
     * The determined entrypoint
     *
     * @type {string}
     * @memberof HostnameJudgetaskidBody
     */
    entryPoint?: string;

    /**
     * The (base64-encoded) metadata of the compilation.
     *
     * @type {string}
     * @memberof HostnameJudgetaskidBody
     */
    compileMetadata?: string;
}
