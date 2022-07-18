import React from 'react';

enum as {
  p = "p",
  span = "span"
}

interface TextProps {
  as: "span" | "p",
  content: string;
}

function Text({
  as,
  content
}: TextProps) {
  return (
    <p>hei</p>
  );
}

export default Text;
