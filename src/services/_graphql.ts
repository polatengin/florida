export const graphql = async <T>(query: string) => {
  const request = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query })
  });
  return request.json() as Promise<T>;
}
