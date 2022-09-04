import React from "react";

interface TextProps {
  as: "span" | "p";
  content: string;
}

function Text({ as, content }: TextProps) {
  return <p>hei</p>;
}

export default Text;
