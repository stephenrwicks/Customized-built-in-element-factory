This is an alternative to [Customized Built-In Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/is).

Customized built-ins using the "is" attribute is a powerful feature but Apple/Safari has no plans to ever support it. This is a workaround that applies the extra prototype manually, which works in Safari.

You define an element you want to extend and the prototype you want to add on top of the native prototype.

Optionally you can also define a setup, which runs immediately after the element is created and its prototype is assigned, as a sort of constructor.

The return value of the customEl function is a factory function that creates instances of your custom element.

It's fully typed in TS so that the returned type will have your extra methods, etc. The value of "this" while defining a method also refers to the element.

Basic example:

```
type CustomButtonProps = {
    text: string;
}

const CustomButton = customEl({
    tagName: 'button',
    methods: {
        log() {
            this.classList.toggle('test');
            console.log(this);
        },
    },
    setup(el, props: CustomButtonProps) {
        el.addEventListener('click', () => {
            el.log();
        });
        
        el.textContent = props.text;
    }
});

const button = CustomButton({text: '123'});

```

