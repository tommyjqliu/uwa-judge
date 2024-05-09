"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Code as CodeIcon,
} from "@mui/icons-material";

const SubmitButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const FileInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const FileInput = styled("input")`
  display: none;
`;

const CodingSubmissionContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CodingSubmissionPaper = styled(Paper)`
  flex: 1;
  margin: 5%;
  display: flex;
  flex-direction: column;
`;

const CodingSubmissionContent = styled(Box)`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const TabsContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
`;

const StyledTabs = styled(Tabs)`
  // background-color: #1976d2;
  // color: white;
  border-radius: 4px;
  padding: 0.5rem;
`;

const ResultsTable = styled(TableContainer)`
  margin-top: 2rem;
  max-height: 200px;
  overflow-y: auto;
`;

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

const CodingSubmissionPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleLanguageChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  const handleEditorChange = (newValue: string | undefined) => {
    setCode(newValue || "");
  };

  const handleSubmit = () => {
    if (
      (selectedTab === 0 && selectedFile) ||
      (selectedTab === 1 && code.trim() !== "")
    ) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setSelectedFile(null);
        setCode("");
      }, 2000);
    }
  };

  return (
    <CodingSubmissionContainer maxWidth={false} disableGutters>
      <CodingSubmissionPaper elevation={3}>
        <CodingSubmissionContent>
          <Typography variant="h4" component="h1" align="left" gutterBottom>
            Submit
          </Typography>
          <TabsContainer>
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="inherit"
            >
              <Tab label="Submit a File" />
              <Tab label="Type up your Code" />
            </StyledTabs>
          </TabsContainer>
          {selectedTab === 1 ? (
            <Box mt={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1" paragraph>
                  Select language:
                </Typography>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  size="small"
                >
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                </Select>
              </Box>
              <MonacoEditor
                width="100%"
                height="400px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </Box>
          ) : (
            <Box
              mt={4}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="body1" paragraph>
                Select a file to submit your code:
              </Typography>
              <IconButton color="primary" component="label">
                <FileInput
                  accept=".zip,.rar,.7z"
                  id="contained-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <AttachFileIcon fontSize="large" />
              </IconButton>
              <Typography variant="body2" ml={1}>
                {selectedFile ? selectedFile.name : "No file selected"}
              </Typography>
            </Box>
          )}
          <Box mt={4} display="flex" justifyContent="right">
            <SubmitButton
              variant="contained"
              size="large"
              endIcon={
                isSubmitting ? <CircularProgress size={24} /> : <SendIcon />
              }
              onClick={handleSubmit}
              disabled={
                (selectedTab === 0 && code.trim() === "") ||
                (selectedTab === 1 && !selectedFile) ||
                isSubmitting
              }
              style={{ marginRight: "5%" }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </SubmitButton>
          </Box>
          <ResultsTable>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Test Case</TableHeaderCell>
                  <TableHeaderCell>Result</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }, (_, index) => (
                  <TableRow key={index}>
                    <TableBodyCell>Test Case {index + 1}</TableBodyCell>
                    <TableBodyCell
                      sx={{
                        backgroundColor: index % 2 === 0 ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {index % 2 === 0 ? "Passed" : "Failed"}
                    </TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResultsTable>
        </CodingSubmissionContent>
      </CodingSubmissionPaper>
    </CodingSubmissionContainer>
  );
};

export default CodingSubmissionPage;
