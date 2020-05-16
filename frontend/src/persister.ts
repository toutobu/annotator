import Vue from 'vue';

/* eslint max-classes-per-file: off */

export interface IndexItem {
  id: string;
  title: string;
  url: string;
}

const BACKEND_URL = process.env.VUE_APP_BACKEND_API_URL;
const SCOPE = process.env.VUE_APP_AUTH0_SCOPE;

const url = (path: string) => `${BACKEND_URL}/${path.replace(/^\//, '')}`;

function getTokenSilently() {
  return Vue.prototype.$auth.getTokenSilently.call(Vue.prototype, {
    scope: SCOPE,
  });
}

class Resource {
  // eslint-disable-next-line class-methods-use-this
  async request(resourceUrl: string, options: RequestInit = {}) {
    const token = await getTokenSilently();
    return fetch(resourceUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

class Persister {
  // eslint-disable-next-line class-methods-use-this
  get examples() {
    return new (class extends Resource {
      getIndex() {
        return this.request(url('/examples'));
      }
    })();
  }
}

export default new Persister();

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
