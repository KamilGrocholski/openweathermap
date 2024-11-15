export class ResponseError extends Error {
  constructor(
    message: string,
    public response: Response,
  ) {
    super(message);
  }
}

export async function myFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new ResponseError("response is not ok", response);
  }
  return response;
}
