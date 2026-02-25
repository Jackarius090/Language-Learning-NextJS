"use client";

import dynamic from "next/dynamic";

const InfoPopover = dynamic(
  () => import("./InfoPopover").then((mod) => mod.InfoPopover),
  { ssr: false }
);

export default function ClientInfoPopover() {
  return <InfoPopover />;
}
