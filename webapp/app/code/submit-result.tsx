import { JudgeResult } from "@/services/judge/get-judge-result";

export default function SubmitResult({ judgeResult }: { judgeResult?: JudgeResult }) {
	return (
		<div className="flex-1 p-4 overflow-y-auto">
			<h2 className="text-2xl font-bold mb-4">Result</h2>
			{judgeResult ? (
				<div className="flex flex-col">
					<div className="w-full max-w-md">
						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
										Progress
									</span>
								</div>
								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-blue-600">
										{judgeResult.pass} / {judgeResult.total}
									</span>
								</div>
							</div>
							<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
								<div
									style={{ width: `${(judgeResult.pass / judgeResult.total) * 100}%` }}
									className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${judgeResult.pass === judgeResult.total ? 'bg-green-500' : 'bg-blue-500'
										}`}
								></div>
							</div>
						</div>
					</div>
					{judgeResult.pass === judgeResult.total ? (
						<div className="mt-4 text-green-500 font-bold">
							Congratulations! All tests passed.
						</div>
					) : (
						<>
							{judgeResult.errorMessage && (
								<div className="mt-4 text-red-500 font-semibold">{judgeResult.errorMessage}</div>
							)}
							{judgeResult.errorDiff && (
								<div className="mt-2 text-red-400 whitespace-pre-wrap bg-red-50 p-4 rounded-md border border-red-200">
									{judgeResult.errorDiff}
								</div>
							)}
						</>
					)}
				</div>
			) : (
				<div className="flex flex-col text-gray-500">
					<svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
					<p>No results yet. Submit your code to see the outcome.</p>
				</div>
			)}
		</div>
	)
}