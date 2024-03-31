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

import { ScoreboardProblems } from './scoreboard-problems';
import { ScoreboardScore } from './scoreboard-score';
import {
    ScoreboardProblems,ScoreboardScore,
} from ".";

/**
 * 
 *
 * @export
 * @interface ScoreboardRows
 */
export interface ScoreboardRows {

    /**
     * @type {number}
     * @memberof ScoreboardRows
     */
    rank?: number;

    /**
     * @type {string}
     * @memberof ScoreboardRows
     */
    teamId?: string;

    /**
     * @type {ScoreboardScore}
     * @memberof ScoreboardRows
     */
    score?: ScoreboardScore;

    /**
     * @type {Array<ScoreboardProblems>}
     * @memberof ScoreboardRows
     */
    problems?: Array<ScoreboardProblems>;
}
