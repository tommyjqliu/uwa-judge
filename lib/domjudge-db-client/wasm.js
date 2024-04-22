
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('@prisma/client/runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.11.0
 * Query Engine version: efd2449663b3d73d637ea1fd226bafbcf45b3102
 */
Prisma.prismaVersion = {
  client: "5.11.0",
  engine: "efd2449663b3d73d637ea1fd226bafbcf45b3102"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AuditlogScalarFieldEnum = {
  logid: 'logid',
  logtime: 'logtime',
  cid: 'cid',
  user: 'user',
  datatype: 'datatype',
  dataid: 'dataid',
  action: 'action',
  extrainfo: 'extrainfo'
};

exports.Prisma.BalloonScalarFieldEnum = {
  balloonid: 'balloonid',
  submitid: 'submitid',
  done: 'done'
};

exports.Prisma.ClarificationScalarFieldEnum = {
  clarid: 'clarid',
  externalid: 'externalid',
  cid: 'cid',
  respid: 'respid',
  submittime: 'submittime',
  sender: 'sender',
  recipient: 'recipient',
  jury_member: 'jury_member',
  probid: 'probid',
  category: 'category',
  queue: 'queue',
  body: 'body',
  answered: 'answered'
};

exports.Prisma.ConfigurationScalarFieldEnum = {
  configid: 'configid',
  name: 'name',
  value: 'value'
};

exports.Prisma.ContestScalarFieldEnum = {
  cid: 'cid',
  externalid: 'externalid',
  name: 'name',
  shortname: 'shortname',
  activatetime: 'activatetime',
  starttime: 'starttime',
  freezetime: 'freezetime',
  endtime: 'endtime',
  unfreezetime: 'unfreezetime',
  deactivatetime: 'deactivatetime',
  activatetime_string: 'activatetime_string',
  starttime_string: 'starttime_string',
  freezetime_string: 'freezetime_string',
  endtime_string: 'endtime_string',
  unfreezetime_string: 'unfreezetime_string',
  deactivatetime_string: 'deactivatetime_string',
  finalizetime: 'finalizetime',
  finalizecomment: 'finalizecomment',
  b: 'b',
  enabled: 'enabled',
  starttime_enabled: 'starttime_enabled',
  process_balloons: 'process_balloons',
  public: 'public',
  open_to_all_teams: 'open_to_all_teams',
  medals_enabled: 'medals_enabled',
  gold_medals: 'gold_medals',
  silver_medals: 'silver_medals',
  bronze_medals: 'bronze_medals',
  is_locked: 'is_locked',
  allow_submit: 'allow_submit',
  warning_message: 'warning_message'
};

exports.Prisma.ContestproblemScalarFieldEnum = {
  cid: 'cid',
  probid: 'probid',
  shortname: 'shortname',
  points: 'points',
  allow_submit: 'allow_submit',
  allow_judge: 'allow_judge',
  color: 'color',
  lazy_eval_results: 'lazy_eval_results'
};

exports.Prisma.ContestteamScalarFieldEnum = {
  cid: 'cid',
  teamid: 'teamid'
};

exports.Prisma.ContestteamcategoryScalarFieldEnum = {
  cid: 'cid',
  categoryid: 'categoryid'
};

exports.Prisma.ContestteamcategoryformedalsScalarFieldEnum = {
  cid: 'cid',
  categoryid: 'categoryid'
};

exports.Prisma.Debug_packageScalarFieldEnum = {
  debug_package_id: 'debug_package_id',
  judgingid: 'judgingid',
  judgehostid: 'judgehostid',
  filename: 'filename'
};

exports.Prisma.Doctrine_migration_versionsScalarFieldEnum = {
  version: 'version',
  executed_at: 'executed_at',
  execution_time: 'execution_time'
};

exports.Prisma.EventScalarFieldEnum = {
  eventid: 'eventid',
  eventtime: 'eventtime',
  cid: 'cid',
  endpointtype: 'endpointtype',
  endpointid: 'endpointid',
  action: 'action',
  content: 'content'
};

exports.Prisma.ExecutableScalarFieldEnum = {
  execid: 'execid',
  description: 'description',
  type: 'type',
  immutable_execid: 'immutable_execid'
};

exports.Prisma.Executable_fileScalarFieldEnum = {
  execfileid: 'execfileid',
  immutable_execid: 'immutable_execid',
  filename: 'filename',
  ranknumber: 'ranknumber',
  file_content: 'file_content',
  hash: 'hash',
  is_executable: 'is_executable'
};

exports.Prisma.External_contest_sourceScalarFieldEnum = {
  extsourceid: 'extsourceid',
  cid: 'cid',
  type: 'type',
  source: 'source',
  username: 'username',
  password: 'password',
  last_event_id: 'last_event_id',
  last_poll_time: 'last_poll_time'
};

exports.Prisma.External_judgementScalarFieldEnum = {
  extjudgementid: 'extjudgementid',
  externalid: 'externalid',
  cid: 'cid',
  submitid: 'submitid',
  result: 'result',
  verified: 'verified',
  jury_member: 'jury_member',
  verify_comment: 'verify_comment',
  starttime: 'starttime',
  endtime: 'endtime',
  valid: 'valid'
};

exports.Prisma.External_runScalarFieldEnum = {
  extrunid: 'extrunid',
  extjudgementid: 'extjudgementid',
  testcaseid: 'testcaseid',
  externalid: 'externalid',
  cid: 'cid',
  result: 'result',
  endtime: 'endtime',
  runtime: 'runtime'
};

exports.Prisma.External_source_warningScalarFieldEnum = {
  extwarningid: 'extwarningid',
  extsourceid: 'extsourceid',
  last_event_id: 'last_event_id',
  time: 'time',
  entity_type: 'entity_type',
  entity_id: 'entity_id',
  type: 'type',
  hash: 'hash',
  content: 'content'
};

exports.Prisma.Immutable_executableScalarFieldEnum = {
  immutable_execid: 'immutable_execid',
  userid: 'userid',
  hash: 'hash'
};

exports.Prisma.Internal_errorScalarFieldEnum = {
  errorid: 'errorid',
  judgingid: 'judgingid',
  cid: 'cid',
  description: 'description',
  judgehostlog: 'judgehostlog',
  time: 'time',
  disabled: 'disabled',
  status: 'status'
};

exports.Prisma.JudgehostScalarFieldEnum = {
  judgehostid: 'judgehostid',
  hostname: 'hostname',
  enabled: 'enabled',
  polltime: 'polltime',
  hidden: 'hidden'
};

exports.Prisma.JudgetaskScalarFieldEnum = {
  judgetaskid: 'judgetaskid',
  judgehostid: 'judgehostid',
  type: 'type',
  priority: 'priority',
  jobid: 'jobid',
  submitid: 'submitid',
  compile_script_id: 'compile_script_id',
  run_script_id: 'run_script_id',
  compare_script_id: 'compare_script_id',
  testcase_id: 'testcase_id',
  compile_config: 'compile_config',
  run_config: 'run_config',
  compare_config: 'compare_config',
  valid: 'valid',
  starttime: 'starttime',
  uuid: 'uuid',
  testcase_hash: 'testcase_hash'
};

exports.Prisma.JudgingScalarFieldEnum = {
  judgingid: 'judgingid',
  cid: 'cid',
  submitid: 'submitid',
  starttime: 'starttime',
  endtime: 'endtime',
  result: 'result',
  verified: 'verified',
  jury_member: 'jury_member',
  verify_comment: 'verify_comment',
  valid: 'valid',
  output_compile: 'output_compile',
  seen: 'seen',
  rejudgingid: 'rejudgingid',
  prevjudgingid: 'prevjudgingid',
  judge_completely: 'judge_completely',
  errorid: 'errorid',
  uuid: 'uuid',
  metadata: 'metadata'
};

exports.Prisma.Judging_runScalarFieldEnum = {
  runid: 'runid',
  judgingid: 'judgingid',
  testcaseid: 'testcaseid',
  runresult: 'runresult',
  runtime: 'runtime',
  endtime: 'endtime',
  judgetaskid: 'judgetaskid'
};

exports.Prisma.Judging_run_outputScalarFieldEnum = {
  runid: 'runid',
  output_run: 'output_run',
  output_diff: 'output_diff',
  output_error: 'output_error',
  output_system: 'output_system',
  metadata: 'metadata'
};

exports.Prisma.LanguageScalarFieldEnum = {
  langid: 'langid',
  externalid: 'externalid',
  name: 'name',
  extensions: 'extensions',
  require_entry_point: 'require_entry_point',
  entry_point_description: 'entry_point_description',
  allow_submit: 'allow_submit',
  allow_judge: 'allow_judge',
  time_factor: 'time_factor',
  compile_script: 'compile_script',
  filter_compiler_files: 'filter_compiler_files'
};

exports.Prisma.ProblemScalarFieldEnum = {
  probid: 'probid',
  externalid: 'externalid',
  name: 'name',
  timelimit: 'timelimit',
  memlimit: 'memlimit',
  outputlimit: 'outputlimit',
  special_run: 'special_run',
  special_compare: 'special_compare',
  special_compare_args: 'special_compare_args',
  combined_run_compare: 'combined_run_compare',
  problemtext: 'problemtext',
  problemtext_type: 'problemtext_type'
};

exports.Prisma.Problem_attachmentScalarFieldEnum = {
  attachmentid: 'attachmentid',
  probid: 'probid',
  name: 'name',
  type: 'type'
};

exports.Prisma.Problem_attachment_contentScalarFieldEnum = {
  attachmentid: 'attachmentid',
  content: 'content'
};

exports.Prisma.QueuetaskScalarFieldEnum = {
  queuetaskid: 'queuetaskid',
  teamid: 'teamid',
  jobid: 'jobid',
  priority: 'priority',
  teampriority: 'teampriority',
  starttime: 'starttime'
};

exports.Prisma.RankcacheScalarFieldEnum = {
  cid: 'cid',
  teamid: 'teamid',
  points_restricted: 'points_restricted',
  totaltime_restricted: 'totaltime_restricted',
  points_public: 'points_public',
  totaltime_public: 'totaltime_public'
};

exports.Prisma.RejudgingScalarFieldEnum = {
  rejudgingid: 'rejudgingid',
  userid_start: 'userid_start',
  userid_finish: 'userid_finish',
  starttime: 'starttime',
  endtime: 'endtime',
  reason: 'reason',
  valid: 'valid',
  auto_apply: 'auto_apply',
  repeat: 'repeat',
  repeat_rejudgingid: 'repeat_rejudgingid'
};

exports.Prisma.Removed_intervalScalarFieldEnum = {
  intervalid: 'intervalid',
  cid: 'cid',
  starttime: 'starttime',
  endtime: 'endtime',
  starttime_string: 'starttime_string',
  endtime_string: 'endtime_string'
};

exports.Prisma.RoleScalarFieldEnum = {
  roleid: 'roleid',
  role: 'role',
  description: 'description'
};

exports.Prisma.ScorecacheScalarFieldEnum = {
  cid: 'cid',
  teamid: 'teamid',
  probid: 'probid',
  submissions_restricted: 'submissions_restricted',
  pending_restricted: 'pending_restricted',
  solvetime_restricted: 'solvetime_restricted',
  is_correct_restricted: 'is_correct_restricted',
  submissions_public: 'submissions_public',
  pending_public: 'pending_public',
  solvetime_public: 'solvetime_public',
  is_correct_public: 'is_correct_public',
  is_first_to_solve: 'is_first_to_solve'
};

exports.Prisma.SessionsScalarFieldEnum = {
  sess_id: 'sess_id',
  sess_data: 'sess_data',
  sess_lifetime: 'sess_lifetime',
  sess_time: 'sess_time'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  submitid: 'submitid',
  origsubmitid: 'origsubmitid',
  cid: 'cid',
  teamid: 'teamid',
  userid: 'userid',
  probid: 'probid',
  langid: 'langid',
  submittime: 'submittime',
  valid: 'valid',
  rejudgingid: 'rejudgingid',
  expected_results: 'expected_results',
  externalid: 'externalid',
  entry_point: 'entry_point'
};

exports.Prisma.Submission_fileScalarFieldEnum = {
  submitfileid: 'submitfileid',
  submitid: 'submitid',
  sourcecode: 'sourcecode',
  filename: 'filename',
  ranknumber: 'ranknumber'
};

exports.Prisma.TeamScalarFieldEnum = {
  teamid: 'teamid',
  externalid: 'externalid',
  icpcid: 'icpcid',
  name: 'name',
  display_name: 'display_name',
  categoryid: 'categoryid',
  affilid: 'affilid',
  enabled: 'enabled',
  publicdescription: 'publicdescription',
  room: 'room',
  internalcomments: 'internalcomments',
  judging_last_started: 'judging_last_started',
  penalty: 'penalty'
};

exports.Prisma.Team_affiliationScalarFieldEnum = {
  affilid: 'affilid',
  externalid: 'externalid',
  icpcid: 'icpcid',
  shortname: 'shortname',
  name: 'name',
  country: 'country',
  internalcomments: 'internalcomments'
};

exports.Prisma.Team_categoryScalarFieldEnum = {
  categoryid: 'categoryid',
  externalid: 'externalid',
  icpcid: 'icpcid',
  name: 'name',
  sortorder: 'sortorder',
  color: 'color',
  visible: 'visible',
  allow_self_registration: 'allow_self_registration'
};

exports.Prisma.Team_unreadScalarFieldEnum = {
  teamid: 'teamid',
  mesgid: 'mesgid'
};

exports.Prisma.TestcaseScalarFieldEnum = {
  testcaseid: 'testcaseid',
  md5sum_input: 'md5sum_input',
  md5sum_output: 'md5sum_output',
  probid: 'probid',
  ranknumber: 'ranknumber',
  description: 'description',
  image_type: 'image_type',
  sample: 'sample',
  orig_input_filename: 'orig_input_filename',
  deleted: 'deleted'
};

exports.Prisma.Testcase_contentScalarFieldEnum = {
  testcaseid: 'testcaseid',
  input: 'input',
  output: 'output',
  image: 'image',
  image_thumb: 'image_thumb',
  tc_contentid: 'tc_contentid'
};

exports.Prisma.UserScalarFieldEnum = {
  userid: 'userid',
  externalid: 'externalid',
  username: 'username',
  name: 'name',
  email: 'email',
  last_login: 'last_login',
  last_api_login: 'last_api_login',
  first_login: 'first_login',
  last_ip_address: 'last_ip_address',
  password: 'password',
  ip_address: 'ip_address',
  enabled: 'enabled',
  teamid: 'teamid'
};

exports.Prisma.UserroleScalarFieldEnum = {
  userid: 'userid',
  roleid: 'roleid'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.internal_error_status = exports.$Enums.internal_error_status = {
  open: 'open',
  resolved: 'resolved',
  ignored: 'ignored'
};

exports.judgetask_type = exports.$Enums.judgetask_type = {
  judging_run: 'judging_run',
  generic_task: 'generic_task',
  config_check: 'config_check',
  debug_info: 'debug_info',
  prefetch: 'prefetch'
};

exports.Prisma.ModelName = {
  auditlog: 'auditlog',
  balloon: 'balloon',
  clarification: 'clarification',
  configuration: 'configuration',
  contest: 'contest',
  contestproblem: 'contestproblem',
  contestteam: 'contestteam',
  contestteamcategory: 'contestteamcategory',
  contestteamcategoryformedals: 'contestteamcategoryformedals',
  debug_package: 'debug_package',
  doctrine_migration_versions: 'doctrine_migration_versions',
  event: 'event',
  executable: 'executable',
  executable_file: 'executable_file',
  external_contest_source: 'external_contest_source',
  external_judgement: 'external_judgement',
  external_run: 'external_run',
  external_source_warning: 'external_source_warning',
  immutable_executable: 'immutable_executable',
  internal_error: 'internal_error',
  judgehost: 'judgehost',
  judgetask: 'judgetask',
  judging: 'judging',
  judging_run: 'judging_run',
  judging_run_output: 'judging_run_output',
  language: 'language',
  problem: 'problem',
  problem_attachment: 'problem_attachment',
  problem_attachment_content: 'problem_attachment_content',
  queuetask: 'queuetask',
  rankcache: 'rankcache',
  rejudging: 'rejudging',
  removed_interval: 'removed_interval',
  role: 'role',
  scorecache: 'scorecache',
  sessions: 'sessions',
  submission: 'submission',
  submission_file: 'submission_file',
  team: 'team',
  team_affiliation: 'team_affiliation',
  team_category: 'team_category',
  team_unread: 'team_unread',
  testcase: 'testcase',
  testcase_content: 'testcase_content',
  user: 'user',
  userrole: 'userrole'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
