## Dev

```bash
$ npm install   #once
$ npm run build
```

**Interactively run:**

This seems to work for now. Runs the action interactively with this dir as the workspace root.

```bash
$ export INPUT_TOKEN="yourpat-to-read-proj-data"
$ ./interactive.sh samples/sample.yaml
```

After you run it, you should see stuff under .reports.
All the query results will be cached and written to .reports/.data if you want to inspect.

To run any other report locally, you can add debug-<name>.yml files to the samples directory and then run as above.
  
**VSCode Debug**

Build at least once which also generates the source maps

```bash
$ npm run build
```

Set the token envvar and launch vscode

```bash
$ export INPUT_TOKEN="yourpat-to-read-proj-data"
$ code .
```

Put your report config in samples/debug.yml (launch.json points to that)

Set a breakpoint in index.ts or generate.ts and run the `Launch Program` debugging option.
