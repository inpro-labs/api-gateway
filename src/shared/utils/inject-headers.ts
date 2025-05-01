export const injectHeaders = (headers: Headers) => {
  return {
    correlationId: headers.get('correlationId') ?? undefined,
    requestId: headers.get('requestId') ?? undefined,
    authorization: headers.get('authorization') ?? undefined,
    userAgent: headers.get('user-agent') ?? undefined,
    ip: headers.get('x-forwarded-for') ?? undefined,
    traceId: headers.get('traceId') ?? undefined,
  };
};
