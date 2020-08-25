export let accessToken = ''

export const setAccessToken = (context: string) => {
    accessToken = context
}

export const getAccessToken = () => {
    return accessToken
}