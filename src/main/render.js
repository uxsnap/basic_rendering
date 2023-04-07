export const createElement = (type, props, ...children) => ({
  type,
  props: props || {},
  children,
});

const mount = (parent) => (dom) => {
  if (parent) parent.appendChild(dom);

  return dom;
};

export const render = (vdom, parent) => {
  const type = typeof vdom;
  console.log(type, vdom ? vdom.type : "");

  const innerMount = mount(parent);

  if (vdom == null || Number.isNaN(vdom)) {
    return innerMount(document.createTextNode(""));
  }

  if (["string", "number", "boolean"].includes(type)) {
    const text = document.createTextNode(
      type === "boolean" && !vdom ? "" : vdom
    );

    return innerMount(text);
  }

  if (type === "object") {
    console.log(vdom);
    if (!vdom || !vdom.type) {
      return innerMount(document.createTextNode(vdom.toString()));
    }

    const dom = document.createElement(vdom.type);

    for (let prop in vdom.props) setProp(dom, prop, vdom.props[prop]);

    for (let child of vdom.children.flat()) {
      render(child, dom);
    }

    return innerMount(dom);
  }

  return document.createTextNode("Error");
};

export const setProp = (dom, key, value) => {
  if (key === "style") {
    Object.assign(dom.style, value);
    return;
  }

  if (key.startsWith("on")) {
    setEventListener(dom, key, value);
    return;
  }

  if (value !== undefined) {
    dom.setAttribute(key, value);
  }
};

const setEventListener = (dom, key, value) => {
  const event = key.slice(2).toLowerCase();

  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};
