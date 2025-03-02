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

const DOMGenerator = (reactObj) => {
  let { props, type, children } = reactObj;
  let id = null;
  let domChild = null;

  if (typeof props === "object" && props.id) {
    id = props.id;
  }

  const node = document.createElement(type);

  if (typeof id === "string") {
    node.id = id;
    node.class = "hell0";
  }

  if (children && Array.isArray(children)) {
    domChild = children;
  } else if (typeof children === "string") {
    node.innerText = children;
  }

  if (Array.isArray(domChild)) {
    const childElements = document?.createDocumentFragment();
    for (const child of domChild) {
      childElements.append(DOMGenerator(child));
    }
    node.append(childElements);
  }
  return node;
};

const ReactDom = () => {
  useEffect(() => {
    const root = DOMGenerator(reactObj);
    document.getElementById("dynamic-dom")?.append(root);
  }, [reactObj]);

  return <div id="dynamic-dom"></div>;
};

export default ReactDom;
