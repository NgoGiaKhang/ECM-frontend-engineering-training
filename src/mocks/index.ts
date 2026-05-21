export async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./browser");

    const baseUrl = import.meta.env.BASE_URL || "/";
    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${baseUrl}mockServiceWorker.js`,
      },
    });
  }
}
