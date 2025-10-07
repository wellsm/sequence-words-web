const TOKEN_KEY = "tokens";

type TokenMap = Record<string, string>;

export function getToken(key: string): string | null {
  const item = localStorage.getItem(TOKEN_KEY);

  if (!item) {
    return null;
  }

  const tokens: TokenMap = JSON.parse(item);

  return tokens[key] ?? null;
}

export function setToken(key: string, token: string): void {
  const tokens: TokenMap = JSON.parse(localStorage.getItem(TOKEN_KEY) ?? "{}");

  tokens[key] = token;

  localStorage.setItem("tokens", JSON.stringify(tokens));
}
