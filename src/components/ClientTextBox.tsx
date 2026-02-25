"use client";

import dynamic from "next/dynamic";

const TextBox = dynamic(() => import("./TextBox"), { ssr: false });

export default function ClientTextBox() {
  return <TextBox />;
}
