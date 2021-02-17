import type { APIRequest } from "aleph/types.ts";

const store = globalThis as any;

export default async function handler(req: APIRequest) {
  const follower = store[`$follower(${req.params.uid})`] || 0;
  const json = await (await fetch(
    `https://api.bilibili.com/x/relation/stat?vmid=${req.params.uid}&jsonp=jsonp`,
  )).json();
  const currentFollower = json.data.follower;

  req.json({ currentFollower, "changed": currentFollower - follower });
  store.$follower = currentFollower;
}
