import { IncomingHttpHeaders } from 'http';

export const injectHeaders = (headers: IncomingHttpHeaders) => {
  return {
    correlationId: headers.correlationId as string | undefined,
    requestId: headers.requestId as string | undefined,
    authorization: headers.authorization,
    userAgent: headers['user-agent'],
    ip: headers['x-forwarded-for'] as string | undefined,
    traceId: headers.traceId as string | undefined,
  };
};
