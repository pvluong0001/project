const MORGAN_OPTIONS = ['uuid', 'url', 'method', 'remote-addr', 'status', 'referrer', 'user-agent', 'response-time'];

export const MORGAN_TEMPLATE = `{${MORGAN_OPTIONS.map(item => `"${item}": ":${item}"`).join(', ')}}`