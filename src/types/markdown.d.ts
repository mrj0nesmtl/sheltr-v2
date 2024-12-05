declare module '*.md?raw' {
  const content: string;
  export default content;
}

declare module '*.md?url' {
  const url: string;
  export default url;
} 