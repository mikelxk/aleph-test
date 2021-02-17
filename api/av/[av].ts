import type { APIRequest } from "aleph/types.ts";

const store = globalThis as any;

export default async function handler(req: APIRequest) {
  const view = store[`$follower(${req.params.av})`] || 0;
  
  const json = await (
    await fetch(
      `http://api.bilibili.com/archive_stat/stat?aid=${req.params.av}&type=jsonp`,
    )
  ).json();
  console.log(json);
  const currentView = json.data.view;

  req.json({ currentView, changed: currentView - view });

  store.$follower = currentView;
}
