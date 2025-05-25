const customEl = <TTagName extends keyof HTMLElementTagNameMap, TPrototype extends Record<string, any>, TProps extends Record<string, any> | unknown = unknown>(
    options: {
        tagName: TTagName,
        methods: TPrototype & ThisType<HTMLElementTagNameMap[TTagName] & TPrototype>,
        setup?: (el: HTMLElementTagNameMap[TTagName] & TPrototype, props: TProps) => void,
    }
) => {
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

    return ((props: TProps) => {
        const el = Object.setPrototypeOf(document.createElement(options.tagName), customProto) as HTMLElementTagNameMap[TTagName] & TPrototype;
        options.setup?.(el, props as TProps);
        return el;
    }) as unknown extends TProps ? () => HTMLElementTagNameMap[TTagName] & TPrototype : (props: TProps) => HTMLElementTagNameMap[TTagName] & TPrototype;
};

export default customEl;