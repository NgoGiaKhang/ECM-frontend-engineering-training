import { useCallback, useEffect, useRef, useState } from "react";

export type ApiError = {
  status: number;
  message: string;
  code: string;
};

type UseFetchState<T> = {
  data: T | null;

  loading: boolean;

  error: ApiError | null;
};

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

const CANCEL_ERRORS = ["CanceledError", "AbortError"] as const;

export function useFetch<T>(fetcher: Fetcher<T>, ...dependencies: unknown[]) {
  const abortRef = useRef<AbortController | null>(null);

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,

    loading: false,

    error: null,
  });

  const execute = useCallback(async () => {
    // abort previous request
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const data = await fetcher(controller.signal);

      // component unmounted
      // request aborted
      if (controller.signal.aborted) {
        return;
      }

      setState({
        data,

        loading: false,

        error: null,
      });

      return data;
    } catch (error: any) {
      // strict mode abort
      if (CANCEL_ERRORS.includes(error.name) || controller.signal.aborted) {
        return;
      }

      const apiError: ApiError = {
        status: error.status ?? 500,
        message: error.message ?? "Unknown error",
        code: error.code ?? "UNKNOWN_ERROR",
      };
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
    }
  }, [fetcher]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  useEffect(() => {
    execute();

    return () => {
      abortRef.current?.abort();
    };
  }, [execute, ...dependencies]);

  return {
    ...state,
    refetch: execute,
    abort,
  };
}
