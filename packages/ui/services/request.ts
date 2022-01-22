import { SupportedDenoSubCommand } from '../../functions/interface';

const { API_URL } = process.env;

export type SupportedRequestPath = SupportedDenoSubCommand | string;

export function performRequest(
  path: SupportedRequestPath,
  body: string,
  queryParams?: URLSearchParams
): Promise<string> {
  const params = queryParams ? `?${queryParams.toString()}` : '';
  const headers = new Headers();
  headers.append('Content-Type', 'application/javascript');
  return fetch(`${API_URL}/${path}${params}`, {
    headers: {
      'Content-Type': 'application/javascript',
    },
    method: 'POST',
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.text();
  });
}

export type ExampleId = 'default' | 'simple' | 'fetch' | 'rss-discord';

export function getExampleSourceCode(exampleId: ExampleId): Promise<string> {
  const { origin } = window.location;
  return fetch(
    `${origin.includes('localhost') ? '/' : '/'}examples/${exampleId}.yml`
  ).then((res) => res.text());
}
