<?php

declare(strict_types=1);
/**
 * Request a yet unjudged submission from the domserver, judge it, and pass
 * the results back to the domserver.
 *
 * Part of the DOMjudge Programming Contest Jury System and licensed
 * under the GNU GPL. See README and COPYING for details.
 */
if (isset($_SERVER['REMOTE_ADDR'])) {
    die("Commandline use only");
}

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

require(ETCDIR . '/judgehost-config.php');
require(LIBDIR . '/lib.misc.php');
require(LIBDIR . '/lib.error.php');

$domjudge_config = [];
$curl_handle = setup_curl_handle();
$endpointID = "webapp";
$endpoint_url = "webapp:3000/api";

function judging_directory(string $workdirpath, array $judgeTask): string
{
    if (
        filter_var($judgeTask['judgeId'], FILTER_VALIDATE_INT) === false
    ) {
        error("Malformed data returned in judgeTask IDs");
    }

    return $workdirpath . '/'
        . $judgeTask['judgeId'];
}

function setup_curl_handle(): CurlHandle|false
{
    $curl_handle = curl_init();
    curl_setopt($curl_handle, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
    return $curl_handle;
}

function close_curl_handles(): void
{
    global $curl_handle;
    curl_close($curl_handle);
}

/**
 * Perform a request to the REST API and handle any errors.
 * $url is the part appended to the base DOMjudge $resturl.
 * $verb is the HTTP method to use: GET, POST, PUT, or DELETE
 * $data is the urlencoded data passed as GET or POST parameters.
 * When $failonerror is set to false, any error will be turned into a
 * warning and null is returned.
 * This function retries request on transient network errors.
 * To deal with the transient errors while avoiding overloads,
 * this function uses exponential backoff algorithm.
 * Every error except HTTP 401, 500 is considered transient.
 */
$lastrequest = '';
function request(string $url, string $verb = 'GET', $data = '', bool $failonerror = true)
{
    global $curl_handle, $endpoint_url, $endpointID, $lastrequest;

    // Don't flood the log with requests for new judgings every few seconds.
    if (str_starts_with($url, 'judgehosts/fetch-work') && $verb === 'POST') {
        if ($lastrequest !== $url) {
            logmsg(LOG_DEBUG, "API request $verb $url");
            $lastrequest = $url;
        }
    } else {
        logmsg(LOG_DEBUG, "API request $verb $url");
        $lastrequest = $url;
    }

    $url = $endpoint_url . "/" . $url;
    if ($verb == 'GET') {
        $url .= '?' . $data;
    }

    curl_setopt($curl_handle, CURLOPT_URL, $url);

    curl_setopt($curl_handle, CURLOPT_CUSTOMREQUEST, $verb);
    curl_setopt($curl_handle, CURLOPT_HTTPHEADER, []);
    if ($verb == 'POST') {
        curl_setopt($curl_handle, CURLOPT_POST, true);
        if (is_array($data)) {
            curl_setopt($curl_handle, CURLOPT_HTTPHEADER, ['Content-Type: multipart/form-data']);
        }
    } else {
        curl_setopt($curl_handle, CURLOPT_POST, false);
    }
    if ($verb == 'POST' || $verb == 'PUT') {
        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $data);
    } else {
        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, null);
    }

    $delay_in_sec = BACKOFF_INITIAL_DELAY_SEC;
    $succeeded = false;
    $response = null;
    $errstr = null;

    for ($trial = 1; $trial <= BACKOFF_STEPS; $trial++) {
        $response = curl_exec($curl_handle);
        if ($response === false) {
            $errstr = "Error while executing curl $verb to url " . $url . ": " . curl_error($curl_handle);
        } else {
            $status = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE);
            if ($status == 401) {
                $errstr = "Authentication failed (error $status) while contacting $url. " .
                    "Check credentials in restapi.secret.";
                break;
            } elseif ($status < 200 || $status >= 300) {
                $json = dj_json_try_decode($response);
                if ($json !== null) {
                    $response = var_export($json, true);
                }
                $errstr = "Error while executing curl $verb to url " . $url .
                    ": http status code: " . $status .
                    ", request size = " . strlen(print_r($data, true)) .
                    ", response: " . $response;
                if ($status == 500) {
                    break;
                }
            } else {
                $succeeded = true;
                break;
            }
        }
        if ($trial == BACKOFF_STEPS) {
            $errstr = $errstr . " Retry limit reached.";
        } else {
            $retry_in_sec = $delay_in_sec + BACKOFF_JITTER_SEC * random_int(0, mt_getrandmax()) / mt_getrandmax();
            $warnstr = $errstr . " This request will be retried after about " .
                $retry_in_sec . "sec... (" . $trial . "/" . BACKOFF_STEPS . ")";
            warning($warnstr);
            dj_sleep($retry_in_sec);
            $delay_in_sec = $delay_in_sec * BACKOFF_FACTOR;
        }
    }
    if (!$succeeded) {
        if ($failonerror) {
            error($errstr);
        } else {
            warning($errstr);
            return null;
        }
    }

    return $response;
}

/**
 * Retrieve the configuration through the REST API.
 */
function djconfig_refresh(): void
{
    global $domjudge_config;

    $domjudge_config = dj_json_decode('{
    "verification_required": false,
    "compile_penalty": false,
    "penalty_time": 20,
    "results_prio": {
        "memory-limit": 99,
        "output-limit": 99,
        "run-error": 99,
        "timelimit": 99,
        "wrong-answer": 99,
        "no-output": 99,
        "correct": 1
    },
    "results_remap": [],
    "score_in_seconds": false,
    "memory_limit": 2097152,
    "output_limit": 8192,
    "process_limit": 64,
    "sourcesize_limit": 256,
    "sourcefiles_limit": 100,
    "script_timelimit": 30,
    "script_memory_limit": 2097152,
    "script_filesize_limit": 2621440,
    "timelimit_overshoot": "1s|10%",
    "output_storage_limit": 50000,
    "output_display_limit": 2000,
    "lazy_eval_results": 1,
    "judgehost_warning": 30,
    "judgehost_critical": 120,
    "diskspace_error": 1048576,
    "default_compare": "compare",
    "default_run": "run",
    "default_full_debug": "full_debug",
    "enable_parallel_judging": true,
    "judgehost_activated_by_default": true,
    "clar_categories": {
        "general": "General issue",
        "tech": "Technical issue"
    },
    "clar_answers": [
        "No comment.",
        "Read the problem statement carefully."
    ],
    "clar_queues": [],
    "clar_default_problem_queue": "",
    "show_pending": true,
    "show_flags": true,
    "show_affiliations": true,
    "show_affiliation_logos": false,
    "show_teams_submissions": true,
    "show_compile": 2,
    "show_sample_output": false,
    "show_balloons_postfreeze": false,
    "show_relative_time": false,
    "time_format": "H:i",
    "thumbnail_size": 200,
    "show_limits_on_team_page": true,
    "allow_team_submission_download": false,
    "team_column_width": 0,
    "show_public_stats": true,
    "auth_methods": [],
    "ip_autologin": false,
    "print_command": "",
    "event_feed_format": 1,
    "data_source": 0,
    "external_ccs_submission_url": "",
    "icat_url": "",
    "external_contest_source_critical": 120
    }');
}

/**
 * Retrieve a value from the DOMjudge configuration.
 */
function djconfig_get_value(string $name)
{
    global $domjudge_config;
    if (empty($domjudge_config)) {
        error("DOMjudge config not initialised before call to djconfig_get_value()");
    }
    return $domjudge_config[$name];
}

/**
 * Encode file contents for POST-ing to REST API.
 * Returns contents of $file (optionally limited in size, see
 * dj_file_get_contents) as encoded string.
 * $sizelimit can be set to the following values:
 * - TRUE: use the 'output_storage_limit' configuration setting
 * - positive integer: limit to this many bytes
 * - FALSE or -1: no size limit imposed
 */
function rest_encode_file(string $file, $sizelimit = true): string
{
    $maxsize = null;
    if ($sizelimit === true) {
        $maxsize = (int) djconfig_get_value('output_storage_limit');
    } elseif ($sizelimit === false || $sizelimit == -1) {
        $maxsize = -1;
    } elseif (is_int($sizelimit) && $sizelimit > 0) {
        $maxsize = $sizelimit;
    } else {
        error("Invalid argument sizelimit = '$sizelimit' specified.");
    }
    return base64_encode(dj_file_get_contents($file, $maxsize));
}

const INITIAL_WAITTIME_SEC = 0.1;
const MAXIMAL_WAITTIME_SEC = 5.0;
$waittime = INITIAL_WAITTIME_SEC;

const SCRIPT_ID = 'judgedaemon';
const CHROOT_SCRIPT = 'chroot-startstop.sh';

function usage(): never
{
    echo "Usage: " . SCRIPT_ID . " [OPTION]...\n" .
        "Start the judgedaemon.\n\n" .
        "  -n <id>           bind to CPU <id> and user " . RUNUSER . "-<id>\n" .
        "  --diskspace-error send internal error on low diskspace\n" .
        "  -v <level>        set verbosity to <level>; these are syslog levels:\n" .
        "                      default is LOG_INFO = 5, max is LOG_DEBUG = 7\n" .
        "  -h                display this help and exit\n" .
        "  -V                output version information and exit\n\n";
    exit;
}

function read_judgehostlog(int $n = 20): string
{
    ob_start();
    passthru("tail -n $n " . dj_escapeshellarg(LOGFILE));
    return trim(ob_get_clean());
}

// Fetches new executable from database if necessary, and runs build script to compile executable.
// Returns an array with absolute path to run script and possibly an error message.
function fetch_executable(
    string $workdirpath,
    string $type,
    string $execid,
    int $judgeTaskId,
    bool $combined_run_compare = false
): array {
    [$execrunpath, $error, $buildlogpath] = fetch_executable_internal($workdirpath, $type, $execid, $combined_run_compare);
    if (isset($error)) {
        $extra_log = null;
        if ($buildlogpath !== null) {
            $extra_log = dj_file_get_contents($buildlogpath, 4096);
        }
        logmsg(
            LOG_ERR,
            "Fetching executable failed for $type script '$execid': " . $error
        );
        $description = "$execid: fetch, compile, or deploy of $type script failed.";
        disable(
            $type . '_script',
            $type . '_script_id',
            $execid,
            $description,
            $judgeTaskId,
            $extra_log
        );
    }
    return [$execrunpath, $error];
}

// Internal function to fetch new executable from database if necessary, and run build script to compile executable.
// Returns an array with
// - absolute path to run script (null if unsuccessful)
// - an error message (null if successful)
// - optional extra build log.
function fetch_executable_internal(
    string $workdirpath,
    string $type,
    string $execid,
    bool $combined_run_compare = false
): array {
    $execdir         = join('/', [
        $workdirpath,
        'executable',
        $type,
        $execid,
    ]);
    global $langexts;
    $execdeploypath  = $execdir . '/.deployed';
    $execbuilddir    = $execdir . '/build';
    $execbuildpath   = $execbuilddir . '/build';
    $execrunpath     = $execbuilddir . '/run';
    $execrunjurypath = $execbuilddir . '/runjury';
    if (!is_dir($execdir) || !file_exists($execdeploypath)) {
        system('rm -rf ' . dj_escapeshellarg($execdir) . ' ' . dj_escapeshellarg($execbuilddir));
        system('mkdir -p ' . dj_escapeshellarg($execbuilddir), $retval);
        if ($retval !== 0) {
            error("Could not create directory '$execbuilddir'");
        }

        logmsg(LOG_INFO, "  💾 Fetching new executable '$type/$execid'.");
        $content = request(sprintf('executables/%s', $execid), 'GET');
        
        $files = dj_json_decode($content);

        unset($content);
        $filesArray = [];
        foreach ($files as $file) {
            $filename = $execbuilddir . '/' . $file['filename'];
            $content = base64_decode($file['content']);
            // logmsg(LOG_INFO, "  Received: " . $content);
            file_put_contents($filename, $content);
            if ($file['is_executable']) {
                chmod($filename, 0755);
            }
            $filesArray[] = [
                'filename' => $file['filename'],
                'is_executable' => $file['is_executable'],
            ];
        }
        unset($files);
        uasort($filesArray, fn(array $a, array $b) => strcmp($a['filename'], $b['filename']));
        // To support in future
        // $computedHash = md5(
        //     join(
        //         array_map(
        //             fn($file) => $file['hash'] . $file['filename'] . $file['is_executable'],
        //             $filesArray
        //         )
        //     )
        // );
        // if ($hash !== $computedHash) {
        //     return [null, "Unexpected hash ($computedHash), expected hash: $hash", null];
        // }

        $do_compile = true;
        if (!file_exists($execbuildpath)) {
            if (file_exists($execrunpath)) {
                // 'run' already exists, 'build' does not => don't compile anything
                logmsg(LOG_DEBUG, "'run' exists without 'build', we are done.");
                $do_compile = false;
            } else {
                // detect lang and write build file
                $buildscript = "#!/bin/sh\n\n";
                $execlang = false;
                $source = "";
                $unescapedSource = "";
                foreach ($langexts as $lang => $langext) {
                    if (($handle = opendir($execbuilddir)) === false) {
                        error("Could not open $execbuilddir");
                    }
                    while (($file = readdir($handle)) !== false) {
                        $ext = pathinfo($file, PATHINFO_EXTENSION);
                        logmsg(LOG_INFO, "Checking file $file with extension $ext");
                        if (in_array($ext, $langext)) {
                            $execlang = $lang;
                            $unescapedSource = $file;
                            $source = dj_escapeshellarg($unescapedSource);
                            break;
                        }
                    }
                    closedir($handle);
                    if ($execlang !== false) {
                        break;
                    }
                }
                if ($execlang === false) {
                    return [null, "executable must either provide an executable file named 'build' or a C/C++/Java or Python file.", null];
                }
                switch ($execlang) {
                    case 'c':
                        $buildscript .= "gcc -Wall -O2 -std=gnu11 $source -o run -lm\n";
                        break;
                    case 'cpp':
                        $buildscript .= "g++ -Wall -O2 -std=gnu++20 $source -o run\n";
                        break;
                    case 'java':
                        $buildscript .= "javac -cp . -d . $source\n";
                        $buildscript .= "echo '#!/bin/sh' > run\n";
                        // no main class detection here
                        $buildscript .= "echo 'COMPARE_DIR=\$(dirname \"\$0\")' >> run\n";
                        $mainClass = basename($unescapedSource, '.java');
                        // Note: since the $@ is within single quotes, we do not need to double escape it.
                        $buildscript .= "echo 'java -cp \"\$COMPARE_DIR\" $mainClass \"\$@\"' >> run\n";
                        $buildscript .= "chmod +x run\n";
                        break;
                    case 'py':
                        $buildscript .= "echo '#!/bin/sh' > run\n";
                        $buildscript .= "echo 'COMPARE_DIR=\$(dirname \"\$0\")' >> run\n";
                        // Note: since the $@ is within single quotes, we do not need to double escape it.
                        $buildscript .= "echo 'python3 \"\$COMPARE_DIR/$source\" \"\$@\"' >> run\n";
                        $buildscript .= "chmod +x run\n";
                        break;
                }
                if (file_put_contents($execbuildpath, $buildscript) === false) {
                    error("Could not write file 'build' in $execbuilddir");
                }
                chmod($execbuildpath, 0755);
            }
        } elseif (!is_executable($execbuildpath)) {
            return [null, "Invalid executable, file 'build' exists but is not executable.", null];
        }

        if ($do_compile) {
            logmsg(LOG_DEBUG, "Building executable in $execdir, under 'build/'");

            putenv('SCRIPTTIMELIMIT=' . djconfig_get_value('script_timelimit'));
            putenv('SCRIPTMEMLIMIT='  . djconfig_get_value('script_memory_limit'));
            putenv('SCRIPTFILELIMIT=' . djconfig_get_value('script_filesize_limit'));

            system(LIBJUDGEDIR . '/build_executable.sh ' . dj_escapeshellarg($execdir), $retval);
            if ($retval !== 0) {
                return [null, "Failed to build executable in $execdir.", "$execdir/build.log"];
            }
            chmod($execrunpath, 0755);
        }
        if (!is_file($execrunpath) || !is_executable($execrunpath)) {
            return [null, "Invalid build file, must produce an executable file 'run'.", null];
        }
        if ($combined_run_compare) {
            # For combined run and compare (i.e. for interactive problems), we
            # need to wrap the jury provided 'run' script with 'runpipe' to
            # handle the bidirectional communication.  First 'run' is renamed to
            # 'runjury', and then replaced by the script below, which runs the
            # team submission and runjury programs and connects their pipes.
            $runscript = file_get_contents(LIBJUDGEDIR . '/run-interactive.sh');
            if (rename($execrunpath, $execrunjurypath) === false) {
                error("Could not move file 'run' to 'runjury' in $execbuilddir");
            }
            if (file_put_contents($execrunpath, $runscript) === false) {
                error("Could not write file 'run' in $execbuilddir");
            }
            chmod($execrunpath, 0755);
        }

        if (!is_file($execrunpath) || !is_executable($execrunpath)) {
            return [null, "Invalid build file, must produce an executable file 'run'.", null];
        }

        // Create file to mark executable successfully deployed.
        touch($execdeploypath);
    }

    return [$execrunpath, null, null];
}

$options = getopt("dv:n:hVe:j:t:", ["diskspace-error"]);
// FIXME: getopt doesn't return FALSE on parse failure as documented!
if ($options === false) {
    echo "Error: parsing options failed.\n";
    usage();
}
if (isset($options['v'])) {
    $options['verbose'] = $options['v'];
}
if (isset($options['n'])) {
    $options['daemonid'] = $options['n'];
}

if (isset($options['V'])) {
    version();
}
if (isset($options['h'])) {
    usage();
}

if (posix_getuid() == 0 || posix_geteuid() == 0) {
    echo "This program should not be run as root.\n";
    exit(1);
}

$myhost = trim(`hostname | cut -d . -f 1`);
if (isset($options['daemonid'])) {
    if (preg_match('/^\d+$/', $options['daemonid'])) {
        $myhost = $myhost . "-" . $options['daemonid'];
    } else {
        echo "Invalid value for daemonid, must be positive integer.\n";
        exit(1);
    }
}

define('LOGFILE', LOGDIR . '/judge.' . $myhost . '.log');

$verbose = LOG_INFO;
if (isset($options['verbose'])) {
    if (preg_match('/^\d+$/', $options['verbose'])) {
        $verbose = $options['verbose'];
        if ($verbose >= LOG_DEBUG) {
            // Also enable judging scripts debug output
            putenv('DEBUG=1');
        }
    } else {
        error("Invalid value for verbose, must be positive integer.");
    }
}

$runuser = RUNUSER;
if (isset($options['daemonid'])) {
    $runuser .= '-' . $options['daemonid'];
}

if (
    $runuser === posix_getpwuid(posix_geteuid())['name'] ||
    RUNGROUP === posix_getgrgid(posix_getegid())['name']
) {
    error("Do not run the judgedaemon as the runser or rungroup.");
}

// Set static environment variables for passing path configuration
// to called programs:
putenv('DJ_BINDIR='      . BINDIR);
putenv('DJ_ETCDIR='      . ETCDIR);
putenv('DJ_JUDGEDIR='    . JUDGEDIR);
putenv('DJ_LIBDIR='      . LIBDIR);
putenv('DJ_LIBJUDGEDIR=' . LIBJUDGEDIR);
putenv('DJ_LOGDIR='      . LOGDIR);
putenv('RUNUSER='        . $runuser);
putenv('RUNGROUP='       . RUNGROUP);

foreach ($EXITCODES as $code => $name) {
    $var = 'E_' . strtoupper(str_replace('-', '_', $name));
    putenv($var . '=' . $code);
}

// Pass SYSLOG variable via environment for compare program
if (defined('SYSLOG') && SYSLOG) {
    putenv('DJ_SYSLOG=' . SYSLOG);
}

// The judgedaemon calls itself to send judging results back to the API
// asynchronously. See the handling of the 'e' option below. The code here
// should only be run during a normal judgedaemon start.
if (empty($options['e'])) {
    if (!posix_getpwnam($runuser)) {
        error("runuser $runuser does not exist.");
    }

    define('LOCKFILE', RUNDIR . '/judge.' . $myhost . '.lock');
    if (($lockfile = fopen(LOCKFILE, 'c')) === false) {
        error("cannot open lockfile '" . LOCKFILE . "' for writing");
    }
    if (!flock($lockfile, LOCK_EX | LOCK_NB)) {
        error("cannot lock '" . LOCKFILE . "', is another judgedaemon already running?");
    }
    if (!ftruncate($lockfile, 0) || fwrite($lockfile, (string)getmypid()) === false) {
        error("cannot write PID to '" . LOCKFILE . "'");
    }

    $output = [];
    exec("ps -u '$runuser' -o pid= -o comm=", $output, $retval);
    if (count($output) !== 0) {
        error("found processes still running as '$runuser', check manually:\n" .
            implode("\n", $output));
    }

    logmsg(LOG_NOTICE, "Judge started on $myhost [DOMjudge/" . DOMJUDGE_VERSION . "]");
}

initsignals();

if (!empty($options['e'])) {
    $endpointID = $options['e'];
    $curl_handle = setup_curl_handle();
    $new_judging_run = (array) dj_json_decode(base64_decode(file_get_contents($options['j'])));
    $judgeTaskId = $options['t'];

    for ($i = 0; $i < 5; $i++) {
        $response = request('judge-tasks', 'POST', $new_judging_run, false);
        if ($response !== null) {
            logmsg(LOG_DEBUG, "Adding judging run result for jt$judgeTaskId successful.");
            break;
        }
        logmsg(LOG_WARNING, "Failed to report $judgeTaskId in attempt #" . ($i + 1) . ".");
        $sleep_ms = 100 + random_int(200, ($i + 1) * 1000);
        dj_sleep(0.001 * $sleep_ms);
    }
    unlink($options['j']);
    exit(0);
}

// Set umask to allow group,other access, as this is needed for the
// unprivileged user.
umask(0022);

// Check basic prerequisites for chroot at judgehost startup
logmsg(LOG_INFO, "🔏 Executing chroot script: '" . CHROOT_SCRIPT . " check'");
system(LIBJUDGEDIR . '/' . CHROOT_SCRIPT . ' check', $retval);
if ($retval !== 0) {
    error("chroot validation check exited with exitcode $retval");
}

registerJudgehost($myhost);

// Populate the DOMjudge configuration initially
djconfig_refresh();

// Prepopulate default language extensions, afterwards update based on domserver config
$langexts = [
    'c' => ['c'],
    'cpp' => ['cpp', 'C', 'cc'],
    'java' => ['java'],
    'py' => ['py'],
];

// Todo: Constantly check API for unjudged submissions
$lastWorkdir = null;
$workdirpath = JUDGEDIR . "/$myhost/endpoint-$endpointID";
$broker_host = 'rabbitmq';
$broker_port = 5672;
$broker_user = 'user';
$broker_pass = 'password';
$max_attempts = 5;
$attempt = 0;
$connected = false;
$lastWorkdir = null;
$workdir = null;

while ($attempt < $max_attempts && !$connected) {
    try {
        $connection = new AMQPStreamConnection($broker_host, $broker_port, $broker_user, $broker_pass);
        $channel = $connection->channel();
        $connected = true; // If no exception is thrown, set connected to true
    } catch (Exception $e) {
        $attempt++;
        if ($attempt < $max_attempts) {
            echo "Connection failed, retrying in 5 seconds...\n";
            sleep(5);
        } else {
            echo "Connection failed after $max_attempts attempts. Exiting.\n";
            exit(1);
        }
    }
}

if ($connected) {
    $callback = function ($msg) {
        global $workdir, $workdirpath, $myhost, $lastWorkdir;
        $judgeTask = json_decode($msg->body, true);
        print_r($judgeTask);

        // Check for available disk space
        $free_space = disk_free_space(JUDGEDIR);
        $allowed_free_space  = djconfig_get_value('diskspace_error'); // in kB
        if ($free_space < 1024 * $allowed_free_space) {
            $after = disk_free_space(JUDGEDIR);
            if (!isset($options['diskspace-error'])) {
                $candidateDirs = [];
                foreach (scandir($workdirpath) as $subdir) {
                    if (is_numeric($subdir) && is_dir(($workdirpath . "/" . $subdir))) {
                        $candidateDirs[] = $workdirpath . "/" . $subdir;
                    }
                }
                uasort($candidateDirs, fn($a, $b) => filemtime($a) <=> filemtime($b));
                $after = $before = disk_free_space(JUDGEDIR);
                logmsg(
                    LOG_INFO,
                    "🗑 Low on diskspace, cleaning up (" . count($candidateDirs) . " potential candidates)."
                );
                $cnt = 0;
                foreach ($candidateDirs as $d) {
                    $cnt++;
                    logmsg(LOG_INFO, "  - deleting $d");
                    system('rm -rf ' . dj_escapeshellarg($d), $retval);
                    if ($retval !== 0) {
                        logmsg(LOG_WARNING, "Deleting '$d' was unsuccessful.");
                    }
                    $after = disk_free_space(JUDGEDIR);
                    if ($after >= 1024 * $allowed_free_space) {
                        break;
                    }
                }
                logmsg(
                    LOG_INFO,
                    "🗑 Cleaned up $cnt old judging directories; reduced disk space by " .
                        sprintf("%01.2fMB.", ($after - $before) / (1024 * 1024))
                );
            }
            if ($after < 1024 * $allowed_free_space) {
                $free_abs = sprintf("%01.2fGB", $after / (1024 * 1024 * 1024));
                logmsg(LOG_ERR, "Low on disk space: $free_abs free, clean up or " .
                    "change 'diskspace error' value in config before resolving this error.");

                disable('judgehost', 'hostname', $myhost, "low on disk space on $myhost");
            }
        }

        // Create workdir for judging.
        $workdir = judging_directory($workdirpath, $judgeTask);
        $version = 0;
        while (file_exists($workdir . 'v' . $version)) {
            // Due to service restarts, we have historical directories
            // We need to clean in in docker layer
            // One possible way is docker compose down -v
            $version++;
        }
        $workdir = $workdir . 'v' . $version;
        logmsg(LOG_INFO, "  Working directory: $workdir");
        system('mkdir -p ' . dj_escapeshellarg("$workdir/compile"), $retval);
        if ($retval !== 0) {
            error("Could not create '$workdir/compile'");
        }

        chmod($workdir, 0755);

        if (!chdir($workdir)) {
            error("Could not chdir to '$workdir'");
        }

        if ($lastWorkdir !== $workdir) {
            // create chroot environment
            logmsg(LOG_INFO, "  🔒 Executing chroot script: '" . CHROOT_SCRIPT . " start'");
            system(LIBJUDGEDIR . '/' . CHROOT_SCRIPT . ' start', $retval);
            if ($retval !== 0) {
                logmsg(LOG_ERR, "chroot script exited with exitcode $retval");
                disable('judgehost', 'hostname', $myhost, "chroot script exited with exitcode $retval on $myhost");
                exit(0);
            }
            $lastWorkdir = $workdir;
        }

        if (!judge($judgeTask)) {
            logmsg(LOG_ERR, "Judging failed for judgeId " . $judgeTask['judgeId']);
        }
    };

    $channel->queue_declare('judgeTask', false, true, false, false);
    $channel->basic_consume('judgeTask', '', false, true, false, false, $callback);

    try {
        $channel->consume();
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
}


function registerJudgehost(string $myhost): void
{
    global $endpointID;

    // Create directory where to test submissions
    $workdirpath = JUDGEDIR . "/$myhost/endpoint-$endpointID";
    system('mkdir -p ' . dj_escapeshellarg("$workdirpath/testcase"), $retval);
    if ($retval !== 0) {
        error("Could not create $workdirpath");
    }
    chmod("$workdirpath/testcase", 0700);
}

function disable(
    string $kind,
    string $idcolumn,
    $id,
    string $description,
    ?int $judgeTaskId = null,
    ?string $extra_log = null
): void {
    global $myhost;
    $disabled = dj_json_encode(['kind' => $kind, $idcolumn => $id]);
    $judgehostlog = read_judgehostlog();
    if (isset($extra_log)) {
        $judgehostlog .= "\n\n"
            . "--------------------------------------------------------------------------------"
            . "\n\n"
            . $extra_log;
    }
    $args = 'description=' . urlencode($description) .
        '&judgehostlog=' . urlencode(base64_encode($judgehostlog)) .
        '&disabled=' . urlencode($disabled) .
        '&hostname=' . urlencode($myhost);
    if (isset($judgeTaskId)) {
        $args .= '&judgetaskid=' . urlencode((string)$judgeTaskId);
    }

    $error_id = request('judge-errors', 'POST', $args);
    logmsg(LOG_ERR, "=> internal error " . $error_id);
}

function read_metadata(string $filename): ?array
{
    if (!is_readable($filename)) {
        return null;
    }

    // Don't quite treat it as YAML, but simply key/value pairs.
    $contents = explode("\n", dj_file_get_contents($filename));
    $res = [];
    foreach ($contents as $line) {
        if (str_contains($line, ":")) {
            [$key, $value] = explode(":", $line, 2);
            $res[$key] = trim($value);
        }
    }

    return $res;
}

function cleanup_judging(string $workdir): void
{
    global $myhost;
    // revoke readablity for domjudge-run user to this workdir
    chmod($workdir, 0700);

    // destroy chroot environment
    logmsg(LOG_INFO, "  🔓 Executing chroot script: '" . CHROOT_SCRIPT . " stop'");
    system(LIBJUDGEDIR . '/' . CHROOT_SCRIPT . ' stop', $retval);
    if ($retval !== 0) {
        logmsg(LOG_ERR, "chroot script exited with exitcode $retval");
        disable('judgehost', 'hostname', $myhost, "chroot script exited with exitcode $retval on $myhost");
        // Just continue here: even though we might continue a current
        // compile/test-run cycle, we don't know whether we're in one here,
        // and worst case, the chroot script will fail the next time when
        // starting.
    }

    // Evict all contents of the workdir from the kernel fs cache
    system(LIBJUDGEDIR . '/evict ' . dj_escapeshellarg($workdir), $retval);
    if ($retval !== 0) {
        warning("evict script exited with exitcode $retval");
    }
}

function compile(
    array $judgeTask,
    string $workdir,
    string $workdirpath,
    array $compile_config,
    string $cpuset_opt,
    int $output_storage_limit
): bool {
    global $myhost, $EXITCODES;

    // Reuse compilation if it already exists.
    if (file_exists("$workdir/compile.success")) {
        return true;
    }
    // Todo: support multiple files
    $sources = [[
        'filename' => "main." . $compile_config['language_extensions'][0],
        'content' => $judgeTask['code'],
    ]];

    $files = [];
    $hasFiltered = false;
    foreach ($sources as $source) {
        $srcfile = "$workdir/compile/$source[filename]";
        $file = $source['filename'];
        if ($compile_config['filter_compiler_files']) {
            $picked = false;
            foreach ($compile_config['language_extensions'] as $extension) {
                $extensionLength = strlen($extension);
                if (substr($file, -$extensionLength) === $extension) {
                    $files[] = $file;
                    $picked = true;
                    break;
                }
            }
            if (!$picked) {
                $hasFiltered = true;
            }
        } else {
            $files[] = $file;
        }
        if (file_put_contents($srcfile, $source['content']) === false) {
            error("Could not create $srcfile");
        }
    }

    if (empty($files) && $hasFiltered) {
        // Note: It may be tempting to assume that this codepath can be never
        // reached since we prevent these submissions from being submitted both
        // via command line and the web interface. However, the code path can
        // be triggered when the filtering is activated between submission and
        // rejudge.
        $message = 'No files with allowed extensions found to pass to compiler. Allowed extensions: '
            . implode(', ', $compile_config['language_extensions']);
        $args = 'compile_success=0' .
            '&output_compile=' . urlencode(base64_encode($message));

        $url = sprintf('judge-tasks/%s', urlencode((string)$judgeTask['judgetaskid']));
        request($url, 'PUT', $args);

        // Revoke readablity for domjudge-run user to this workdir.
        chmod($workdir, 0700);
        logmsg(LOG_NOTICE, "Judging task $judgeTask[judgetaskid]: compile error");
        return false;
    }

    if (count($files) == 0) {
        error("No submission files could be downloaded.");
    }

    [$execrunpath, $error] = fetch_executable(
        $workdirpath,
        'compile',
        $judgeTask['compile_script_id'],
        $judgeTask['judgetaskid']
    );
    if (isset($error)) {
        return false;
    }

    // Compile the program.
    $compile_cmd = LIBJUDGEDIR . "/compile.sh $cpuset_opt " .
        implode(' ', array_map('dj_escapeshellarg', array_merge([
            $execrunpath,
            $workdir,
        ], $files)));
    logmsg(3, "Compile command: " . $compile_cmd);
    system($compile_cmd, $retval);
    if ($retval !== 0) {
        warning("compile script exited with exitcode $retval $compile_cmd");
    }

    $compile_output = '';
    if (is_readable($workdir . '/compile.out')) {
        $compile_output = dj_file_get_contents($workdir . '/compile.out', 50000);
    }
    if (empty($compile_output) && is_readable($workdir . '/compile.tmp')) {
        $compile_output = dj_file_get_contents($workdir . '/compile.tmp', 50000);
    }

    // Try to read metadata from file
    $metadata = read_metadata($workdir . '/compile.meta');
    if (isset($metadata['internal-error'])) {
        alert('error');
        $internalError = $metadata['internal-error'];
        $compile_output .= "\n--------------------------------------------------------------------------------\n\n" .
            "Internal errors reported:\n" . $internalError;

        if (str_starts_with($internalError, 'compile script: ')) {
            $internalError = preg_replace('/^compile script: /', '', $internalError);
            $description = "The compile script returned an error: $internalError";
            disable('compile_script', 'compile_script_id', $judgeTask['compile_script_id'], $description, $judgeTask['judgetaskid'], $compile_output);
        } else {
            $description = "Running compile.sh caused an error/crash: $internalError";
            // Note we are disabling the judgehost in this case since it's
            // likely an error intrinsic to this judgehost's setup, e.g.
            // missing cgroups.
            disable('judgehost', 'hostname', $myhost, $description, $judgeTask['judgetaskid'], $compile_output);
        }
        logmsg(LOG_ERR, $description);

        return false;
    }

    // What does the exitcode mean?
    if (! isset($EXITCODES[$retval])) {
        alert('error');
        $description = "Unknown exitcode from compile.sh for s$judgeTask[judgeId]: $retval";
        logmsg(LOG_ERR, $description);
        disable('compile_script', 'compile_script_id', $judgeTask['compile_script_id'], $description, $judgeTask['judgetaskid'], $compile_output);

        return false;
    }

    logmsg(LOG_INFO, "  💻 Compilation: ($files[0]) '" . $EXITCODES[$retval] . "'");
    $compile_success = ($EXITCODES[$retval] === 'correct');

    // Pop the compilation result back into the judging table.
    $args = 'compile_success=' . $compile_success .
        '&output_compile=' . urlencode(rest_encode_file($workdir . '/compile.out', $output_storage_limit)) .
        '&compile_metadata=' . urlencode(rest_encode_file($workdir . '/compile.meta', false)) .
        '&my_host=' . $myhost .
        '&judge_task_id=' . (string)$judgeTask['judgetaskid'];

    if (isset($metadata['entry_point'])) {
        $args .= '&entry_point=' . urlencode($metadata['entry_point']);
    }

    $url = sprintf('judge-tasks/%s', urlencode((string)$judgeTask['judgetaskid']));
    request($url, 'PUT', $args);

    // Compile error: our job here is done.
    if (! $compile_success) {
        return false;
    }

    touch("$workdir/compile.success");

    return true;
}

function judge(array $judgeTask): bool
{
    global $workdir, $EXITCODES, $myhost, $options, $workdirpath, $exitsignalled, $gracefulexitsignalled, $endpointID;

    $compile_config = dj_json_decode($judgeTask['compile_config']);
    $run_config     = dj_json_decode($judgeTask['run_config']);
    $compare_config = dj_json_decode($judgeTask['compare_config']);

    // Set configuration variables for called programs
    putenv('CREATE_WRITABLE_TEMP_DIR=' . (CREATE_WRITABLE_TEMP_DIR ? '1' : ''));

    // These are set again below before comparing.
    putenv('SCRIPTTIMELIMIT='          . $compile_config['script_timelimit']);
    putenv('SCRIPTMEMLIMIT='           . $compile_config['script_memory_limit']);
    putenv('SCRIPTFILELIMIT='          . $compile_config['script_filesize_limit']);

    putenv('MEMLIMIT='                 . $run_config['memory_limit']);
    putenv('FILELIMIT='                . $run_config['output_limit']);
    putenv('PROCLIMIT='                . $run_config['process_limit']);
    if ($run_config['entry_point'] !== null) {
        putenv('ENTRY_POINT=' . $run_config['entry_point']);
    } else {
        putenv('ENTRY_POINT');
    }
    $output_storage_limit = (int) djconfig_get_value('output_storage_limit');

    $cpuset_opt = "";
    if (isset($options['daemonid'])) {
        $cpuset_opt = '-n ' . dj_escapeshellarg($options['daemonid']);
    }


    $compile_success = compile($judgeTask, $workdir, $workdirpath, $compile_config, $cpuset_opt, $output_storage_limit);
    if (!$compile_success) {
        return false;
    }

    // TODO: How do we plan to handle these?
    $overshoot = djconfig_get_value('timelimit_overshoot');

    logmsg(LOG_INFO, "  🏃 Running testcase $judgeTask[testcase_id]...");
    $testcasedir = $workdir . "/testcase" . sprintf('%05d', $judgeTask['testcase_id']);
    $tcfile = fetchTestcase($judgeTask);
    if ($tcfile === null) {
        // error while fetching testcase
        return false;
    }

    // Copy program with all possible additional files to testcase
    // dir. Use hardlinks to preserve space with big executables.
    $programdir = $testcasedir . '/execdir';
    system('mkdir -p ' . dj_escapeshellarg($programdir), $retval);
    if ($retval !== 0) {
        error("Could not create directory '$programdir'");
    }

    foreach (glob("$workdir/compile/*") as $compile_file) {
        system('cp -PRl ' . dj_escapeshellarg($compile_file) . ' ' . dj_escapeshellarg($programdir), $retval);
        if ($retval !== 0) {
            error("Could not copy program to '$programdir'");
        }
    }

    // do the actual test-run
    $combined_run_compare = $compare_config['combined_run_compare'];
    [$run_runpath, $error] = fetch_executable(
        $workdirpath,
        'run',
        $judgeTask['run_script_id'],
        $judgeTask['judgetaskid'],
        $combined_run_compare
    );
    if (isset($error)) {
        return false;
    }

    if ($combined_run_compare) {
        // set to empty string to signal the testcase_run script that the
        // run script also acts as compare script
        $compare_runpath = '';
    } else {
        [$compare_runpath, $error] = fetch_executable(
            $workdirpath,
            'compare',
            $judgeTask['compare_script_id'],
            $judgeTask['judgetaskid']
        );
        if (isset($error)) {
            return false;
        }
    }

    $hardtimelimit = $run_config['time_limit'] +
        overshoot_time($run_config['time_limit'], $overshoot);
    if ($combined_run_compare) {
        // This accounts for wall time spent in the validator. We may likely
        // want to make this configurable in the future. The current factor is
        // under the assumption that the validator has to do approximately the
        // same amount of work wall-time wise as the submission.
        $hardtimelimit *= 2;
    }

    // While we already set those above to likely the same values from the
    // compile config, we do set them again from the compare config here.
    putenv('SCRIPTTIMELIMIT=' . $compare_config['script_timelimit']);
    putenv('SCRIPTMEMLIMIT='  . $compare_config['script_memory_limit']);
    putenv('SCRIPTFILELIMIT=' . $compare_config['script_filesize_limit']);

    $test_run_cmd = LIBJUDGEDIR . "/testcase_run.sh $cpuset_opt " .
        implode(' ', array_map('dj_escapeshellarg', [
            $tcfile['input'],
            $tcfile['output'],
            "$run_config[time_limit]:$hardtimelimit",
            $testcasedir,
            $run_runpath,
            $compare_runpath,
            $compare_config['compare_args']
        ]));
    system($test_run_cmd, $retval);
    logmsg(3, $test_run_cmd);
    // What does the exitcode mean?
    if (! isset($EXITCODES[$retval])) {
        alert('error');
        error("Unknown exitcode ($retval) from testcase_run.sh for s$judgeTask[judgeId]");
    }
    $result = $EXITCODES[$retval];

    // Try to read metadata from file
    $runtime = null;
    $metadata = read_metadata($testcasedir . '/program.meta');

    if (isset($metadata['time-used'])) {
        $runtime = @$metadata[$metadata['time-used']];
    }

    if ($result === 'compare-error') {
        if ($combined_run_compare) {
            logmsg(LOG_ERR, "comparing failed for combined run/compare script '" . $judgeTask['run_script_id'] . "'");
            $description = 'combined run/compare script ' . $judgeTask['run_script_id'] . ' crashed';
            disable('run_script', 'run_script_id', $judgeTask['run_script_id'], $description, $judgeTask['judgetaskid']);
        } else {
            logmsg(LOG_ERR, "comparing failed for compare script '" . $judgeTask['compare_script_id'] . "'");
            $description = 'compare script ' . $judgeTask['compare_script_id'] . ' crashed';
            disable('compare_script', 'compare_script_id', $judgeTask['compare_script_id'], $description, $judgeTask['judgetaskid']);
        }
        return false;
    }

    $new_judging_run = [
        'runresult' => urlencode($result),
        'runtime' => urlencode((string)$runtime),
        'output_run'   => rest_encode_file($testcasedir . '/program.out', $output_storage_limit),
        'output_error' => rest_encode_file($testcasedir . '/program.err', $output_storage_limit),
        'output_system' => rest_encode_file($testcasedir . '/system.out', $output_storage_limit),
        'metadata' => rest_encode_file($testcasedir . '/program.meta', false),
        'output_diff'  => rest_encode_file($testcasedir . '/feedback/judgemessage.txt', $output_storage_limit),
        'hostname' => $myhost,
        'testcasedir' => $testcasedir,
    ];

    if (file_exists($testcasedir . '/feedback/teammessage.txt')) {
        $new_judging_run['team_message'] = rest_encode_file($testcasedir . '/feedback/teammessage.txt', $output_storage_limit);
    }

    $ret = true;
    if ($result === 'correct') {
        // Post result back asynchronously. PHP is lacking multi-threading, so
        // we just call ourselves again.
        $tmpfile = tempnam(TMPDIR, 'judging_run_');
        file_put_contents($tmpfile, base64_encode(dj_json_encode($new_judging_run)));
        $judgedaemon = BINDIR . '/judgedaemon';
        $cmd = $judgedaemon
            . ' -e ' . $endpointID
            . ' -t ' . $judgeTask['judgetaskid']
            . ' -j ' . $tmpfile
            . ' >> /dev/null & ';
        shell_exec($cmd);
    } else {
        // This run was incorrect, only continue with the remaining judge tasks
        // if we are told to do so.
        $needsMoreWork = request(
            'judge-tasks',
            'POST',
            $new_judging_run,
            false
        );
        $ret = (bool)$needsMoreWork;
    }

    $walltime = $metadata['wall-time'] ?? '?';
    logmsg(LOG_INFO, ' ' . ($result === 'correct' ? " \033[0;32m✔\033[0m" : " \033[1;31m✗\033[0m")
        . '  ...done in ' . $walltime . 's (CPU: ' . $runtime . 's), result: ' . $result);

    // done!
    return $ret;
}

function fetchTestcase(array $judgeTask): ?array
{
    global $workdirpath;
    // Get both in- and output files, only if we didn't have them already.
    $testcase_id = $judgeTask['testcase_id'];
    $tcfile = [];
    $bothFilesExist = true;
    foreach (['input', 'output'] as $inout) {
        $testcasedir = $workdirpath . '/testcase/' . $testcase_id;
        if (!is_dir($testcasedir)) {
            mkdir($testcasedir, 0755, true);
        }
        $tcfile[$inout] = $testcasedir . '/' .
            $testcase_id . '.' .
            substr($inout, 0, -3);
        if (!file_exists($tcfile[$inout])) {
            $bothFilesExist = false;
        }
    }
    if ($bothFilesExist) {
        return $tcfile;
    }
    foreach (['input', 'output'] as $inout) {
        $filename = $tcfile[$inout];
        file_put_contents($filename, $judgeTask[$inout]);
    }
    logmsg(LOG_INFO, "  💾 Fetched new testcase $testcase_id.");
    return $tcfile;
}
