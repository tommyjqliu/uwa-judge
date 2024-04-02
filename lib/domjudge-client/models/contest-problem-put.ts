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
 * @interface ContestProblemPut
 */
export interface ContestProblemPut {

    /**
     * The label of the problem to add to the contest
     *
     * @type {string}
     * @memberof ContestProblemPut
     */
    label: string;

    /**
     * Human readable color of the problem to add. Will be overwritten by `rgb` if supplied
     *
     * @type {string}
     * @memberof ContestProblemPut
     */
    color?: string;

    /**
     * Hexadecimal RGB value of the color of the problem to add. Will be used if both `color` and `rgb` are supplied
     *
     * @type {string}
     * @memberof ContestProblemPut
     */
    rgb?: string;

    /**
     * The number of points for the problem to add. Defaults to 1
     *
     * @type {number}
     * @memberof ContestProblemPut
     */
    points?: number;

    /**
     * Whether to use lazy evaluation for this problem. Defaults to the global setting
     *
     * @type {boolean}
     * @memberof ContestProblemPut
     */
    lazy_eval_results?: boolean;
}
