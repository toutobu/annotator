/* eslint max-classes-per-file: off */

// TODO: Extract this to environment variables.
const BACKEND_URL = '/api';

const url = (path: string) => `${BACKEND_URL}/${path.replace(/^\//, '')}`;

const examples = {
  getIndex() {
    return fetch(url('/examples'));
  },
};

export default { examples };

export class UserError extends Error {}
export class ServerError extends Error {}

export function assertSucceeded(response: Response) {
  if (response.status >= 500) {
    throw new ServerError(response.statusText);
  }

  if (response.status >= 400) {
    throw new UserError(response.statusText);
  }
}
