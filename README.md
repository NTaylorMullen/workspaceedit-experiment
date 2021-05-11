# The bug

Running two workspace edits in a row and then awaiting them after results in a failure to apply the second workspace edit. This experiment attempts to add `ab` at the top of the current file you have open via two different workspace edits: one for `a` and one for `b`. An expectation would be that the client would at the very least enqueue these workspace edits and run them one after the other.

# Running the experiment

1. Run the extension
2. Open a file that has at least 1 line and its content is at least 2 long
3. Invoke the experiment command: Ctrl + Shift + P => "Run experiment"
  ![image](https://user-images.githubusercontent.com/2008729/117874907-6f597f80-b256-11eb-9d8a-6e09812463a1.png)
4. See an information message in the bottom right corner with the result.
  ![image](https://user-images.githubusercontent.com/2008729/117874961-7c766e80-b256-11eb-9694-70768bc5bd0d.png)

Following the above steps result in `[ true, false ]` (unexpected). You can follow [these](https://github.com/NTaylorMullen/workspaceedit-experiment/blob/be8865cef96e986c3838f6fc6a400186dcf68f0f/extension.js#L23-L25) instructions to get `[ true, true ]`
