import { AccountsApi, configuration } from '@/lib/domjudge-client'

export async function GET(request: Request) {
    const api = new AccountsApi(configuration);
    const result = await api.getV4AppApiAccountList('1')
    console.log(result)
    return new Response('Hello, Next.js!!!', {
        status: 200,
    })
}