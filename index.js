const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const fs = require('fs');

/**
 * Retrieve a secret from google secret manager.
 */
exports.getSecret = (name) => {
  const serviceAccount = getServiceAccount();
  const client = new SecretManagerServiceClient(serviceAccount);
  return client.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT}/secrets/${name}/versions/latest`,
  })
    .then(([version]) => version.payload.data.toString('utf8'));
};

/**
 * Check for a valid service account.
 */
const getServiceAccount = () => {
  if (!process.env.KEY_FILE_NAME_PATH) {
    return {};
  }

  const path = process.env.KEY_FILE_NAME_PATH || './';

  try {
    if (fs.existsSync(path)) {
      return {
        projectId: process.env.GCP_PROJECT,
        keyFilename: path
      };
    }
  } catch (err) {
    return {};
  }
  return {};
};

exports.getServiceAccount = getServiceAccount;
