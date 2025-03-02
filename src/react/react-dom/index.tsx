import { useEffect } from "react";

const reactObj = {
  type: "div",
  props: { id: "dynamic-dom-root" },
  children: [
    {
      type: "h1",
      props: { id: "heading-1" },
      children: "Hello This is React DOM",
    },
    {
      type: "h2",
      props: { id: "heading-2" },
      children: "This is dynamically generated",
    },
    {
      type: "div",
      props: { id: "card" },
      children: [
        {
          type: "div",
          props: { id: "card-heading" },
          children: " Card Heading",
        },
      ],
    },
  ],
};

const DOMGenerator = (reactObj, parentId) => {
  let { props, type, children } = reactObj;
  const node = document.createElement(type);

  if (props && props.id) {
    node.id = props.id;
  }

  if (Array.isArray(children)) {
    node.append(children?.map((child) => DOMGenerator(child, props?.id)));
  } else {
    node.innerText = children;
  }
  document.getElementById(parentId)?.append(node);

  //   return node;
};

const ReactDom = () => {
  useEffect(() => {
    DOMGenerator(reactObj, "dynamic-dom");
  }, [reactObj]);

  return <div id="dynamic-dom"></div>;
};

export default ReactDom;
