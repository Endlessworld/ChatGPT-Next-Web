import { SearxPath, REQUEST_TIMEOUT_MS } from "@/app/constant";

export class SearxApi {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public path(path: string): string {
    let url = this.url;
    if (url.endsWith("/")) {
      url = url.slice(0, url.length - 1);
    }
    return [url, path].join("/");
  }

  public async searxSearch(query: string, pageno: number = 5) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const res = await fetch(
      this.path(`search?q=${encodeURIComponent(query)}&max_results=${pageno}`),
      {
        method: "GET",
        signal: controller.signal,
        headers,
      },
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Fetch Searx results failed, status: ${res.status}`);
    }
    return await res.json();
  }
}
