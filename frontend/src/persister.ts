import Vue from 'vue';

/* eslint max-classes-per-file: off */

export interface IndexItem {
  id: string;
  title: string;
  url: string;
}

export interface Detail extends IndexItem {
  morphemes: Array<Morpheme>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  annotation: any;
}

export interface Morpheme {
  surface: string;
  pos: string;
  subpos1: string;
  originalForm: string;
}

const BACKEND_URL = process.env.VUE_APP_BACKEND_API_URL;
const SCOPE = process.env.VUE_APP_AUTH0_SCOPE;

export class UserError extends Error {}
export class ServerError extends Error {}

const url = (path: string) => `${BACKEND_URL}/${path.replace(/^\//, '')}`;

export function assertSucceeded(response: Response) {
  if (response.status >= 500) {
    throw new ServerError(response.statusText);
  }

  if (response.status >= 400) {
    throw new UserError(response.statusText);
  }
}

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
      async list() {
        const response = await this.request(url('/examples'));
        assertSucceeded(response);
        return response.json();
      }

      async retrieve(id: number) {
        const response = await this.request(url(`/examples/${id}`));
        assertSucceeded(response);
        const data = await response.json();
        return {
          ...data,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          morphemes: data.morphemes.map((m: any) => ({
            ...m,
            originalForm: m.original_form,
          })),
        };
      }
    })();
  }
}

export default new Persister();
