import { CopyBlock, dracula } from "react-code-blocks";

function CodeBlockJS({ results }) {
  return (
    <CopyBlock
      showLineNumbers={true}
      text={JSON.stringify(results, null, 2)}
      theme={dracula}
      language="javascript"
    />
  );
}

export default CodeBlockJS;
