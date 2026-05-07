"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md shadow-zinc-900/[0.06]">
      <h3 className="text-xl font-semibold text-zinc-950">Newsletter Signup</h3>
      <p className="mt-2 text-sm text-zinc-600">Get match updates, trials and event announcements.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input type="email" placeholder="Enter email" />
        <Button onClick={() => setSubscribed(true)}>Subscribe</Button>
      </div>
      {subscribed && <p className="mt-3 text-sm font-medium text-green-700">You are subscribed.</p>}
    </div>
  );
}
