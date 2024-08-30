"use client";
import axios from "@/lib/axios";
import ClientContext from "@/lib/components/client-context";
import EntitySelector from "@/lib/components/entity-selector";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { request } from "http";
import { useCallback, useState } from "react";

export interface CodeEditorProps {
  problemId?: number;
  problemVersionId?: number;
}

const ResultsTable = styled(TableContainer)`
  margin-top: 2rem;
  max-height: 200px;
  overflow-y: auto;
` as typeof TableContainer;

const TableHeaderCell = styled(TableCell)`
  background-color: #1976d2;
  color: white;
  border-right: 1px solid #ccc;
  &:last-child {
    border-right: none;
  }
`;

const TableBodyCell = styled(TableCell)`
  border-bottom: 1px solid #ccc;
`;

export default function CodeEditor({
  problemId,
  problemVersionId,
}: CodeEditorProps) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [testcaseResults, setTestcaseResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };
  const submit = useCallback(async () => {
    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await axios.postForm("/api/submissions", {
        problemId,
        language,
        code,
      });

      console.log(response);
      if (response.status === 200) {
        const { judging, testcaseResults } = response.data;
        setSubmissionStatus(judging.result);
        setTestcaseResults(testcaseResults);
      } else {
        console.error("Submission failed:", response.status);
        setSubmissionStatus("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("Submission error");
    } finally {
      setIsLoading(false);
    }
  }, [code, language, problemId]);

  return (
    <ClientContext>
      <Box p={2}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <Box mb={2}>
                <EntitySelector
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as string)}
                  entityQuery={{
                    entity: "language",
                    action: "findMany",
                  }}
                />
              </Box>
              <Box mb={2}>
                <Editor
                  width="100%"
                  height="400px"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(newValue) => setCode(newValue || "")}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 1 }}
                    component="label"
                  >
                    Upload Files
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {selectedFile && (
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Selected file: {selectedFile.name}
                    </Typography>
                  )}
                </Box>
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  submissionStatus && (
                    <Typography variant="body1">
                      Submission Status: {submissionStatus}
                    </Typography>
                  )
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box mt={4}>
          <ResultsTable component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell sx={{ width: "20%" }}>
                    Test Case
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "80%" }}>
                    Result
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testcaseResults.map((result, index) => (
                  <TableRow key={result.runid}>
                    <TableBodyCell>Test Case {index + 1}</TableBodyCell>
                    <TableBodyCell
                      sx={{
                        backgroundColor:
                          result.result === "correct" ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {result.result === "correct" ? (
                        "Passed"
                      ) : (
                        <div>
                          <div>Failed</div>
                          {result.output_diff && (
                            <div>Diff: {result.output_diff}</div>
                          )}
                          {result.output_error && (
                            <div>Error: {result.output_error}</div>
                          )}
                          {result.output_system && (
                            <div>System: {result.output_system}</div>
                          )}
                        </div>
                      )}
                    </TableBodyCell>
                  </TableRow>
                ))}
                {/* Making it minimum 3 rows and deleting any lines if its empty. */}
                {Array.from({
                  length: Math.max(0, 3 - testcaseResults.length),
                }).map((_, index) => (
                  <TableRow key={`empty-${index}`}>
                    <TableBodyCell
                      sx={{ borderBottom: "none" }}
                    ></TableBodyCell>
                    <TableBodyCell
                      sx={{ borderBottom: "none" }}
                    ></TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResultsTable>
        </Box>
      </Box>
    </ClientContext>
  );
}
