export function getConfig(envVariableName: string) {
    return process.env[envVariableName]
}
