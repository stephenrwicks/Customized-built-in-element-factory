const customEl = (options) => {
    const origProto = Object.create(Object.getPrototypeOf(document.createElement(options.tagName)));
    for (const k in options.methods) {
        if (k in origProto) {
            throw new Error(`Conflict with native property: ${k}`);
        }
    }
    const customProto = Object.freeze(Object.defineProperties(origProto, {
        [Symbol.toStringTag]: { value: `CustomPrototype[${options.tagName}]` },
        ...Object.getOwnPropertyDescriptors(options.methods),
    }));
    return ((props) => {
        const el = Object.setPrototypeOf(document.createElement(options.tagName), customProto);
        options.setup?.(el, props);
        return el;
    });
};
export default customEl;
