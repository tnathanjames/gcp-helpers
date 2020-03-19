# GCP Helpers

To work with Google Cloud Function libraries in node, some code blocks occur frequently. It is also difficult to run functions locally with the functions framework, but have them also work when checked out of a repository in GCP. The helpers in this module aim to simplify a few things surrounding working with google cloud platform libraries in nodejs.

## Quickstart

### Installing

```bash
npm install https://github.com/tnathanjames/gcp-helpers.git
```

### Using the package

```javascript
// Import the functions.
const { getSecret, getServiceAccount } = require("gcp-helpers");
// Require a library provided by @google-cloud like bigquery shown here.
const { BigQuery } = require("@google-cloud/bigquery");

async function logRows() {
  // This looks in the path provided by an environment variable called
  // KEY_FILE_NAME_PATH. If it doesn't exist, it returns an empty object which
  // causes libraries like BigQuery to use default credentials (like if it is
  // running in GCP).
  const serviceAccount = getServiceAccount();
  const bigquery = new BigQuery(serviceAccount);

  // To get a secret, call get secret with the name of the secret. When
  // setting up secrets in GCP, the secret must be prefixed with the project
  // id and the project id should be stored in GCP_PROJECT environment var.
  const mySecret = await getSecret("my-secret");
  // In the case above, the secret would be my-first-project-my-secret if
  // your project is my-first-project.
}
```
