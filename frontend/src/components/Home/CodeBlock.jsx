import { CopyBlock, dracula } from "react-code-blocks";

function CodeBlockJS({ results }) {
  return (
    <CopyBlock
      text={JSON.stringify(results, null, 2)}
      theme={dracula}
      language="javascript"
      wrapLines={true}
    />
  );
}

export default CodeBlockJS;
