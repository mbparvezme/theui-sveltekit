// export interface EditorType {
//   isHeading?: boolean;
//   headingNumber?: 1;
//   isBold?: boolean;
//   isItalic?: boolean;
//   isUnderline?: boolean;
//   isStrike?: boolean;
//   isSubscript?: boolean;
//   isSuperscript?: boolean;
//   isAlign?: boolean;
//   isAlignStart?: boolean;
//   isAlignCenter?: boolean;
//   isAlignEnd?: boolean;
//   isAlignJustified?: boolean;
//   isUnorderedList?: boolean;
//   isOrderedList?: boolean;
//   isListLabel?: boolean;
//   isQuote?: boolean;
//   isCode?: boolean;
//   isCodeBlock?: boolean;
//   isLink?: boolean;
//   isHR?: boolean;
//   isYoutube?: boolean;
//   isColor?: boolean;
//   isHighlight?: boolean;
//   editor: any;
// }

export interface EditorType {
  [key: string]: any;
  headingNumber: null|1|2|3|4|5|6;
  editor: any;
}

export class EditorClass {
  state = $state<EditorType>({
    isHeading: false,
    headingNumber: null,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrike: false,
    isSubscript: false,
    isSuperscript: false,
    isAlign: false,
    isAlignStart: false,
    isAlignCenter: false,
    isAlignEnd: false,
    isAlignJustified: false,
    isUnorderedList: false,
    isOrderedList: false,
    isListLabel: false,
    isQuote: false,
    isCode: false,
    isCodeBlock: false,
    isLink: false,
    isHR: false,
    isYoutube: false,
    isColor: false,
    isHighlight: false,
    editor: null,
  });

  getState() {
    return this.state;
  }

  // Example method to update state
  setState(key: keyof EditorType, value: any) {
    this.state[key] = value;
  }

  constructor(editor: any) {
    this.state.editor = editor
  }

  before() {
    console.log("Before: Preparing for the action...");
    // Add custom logic here
  }

  after() {
    console.log("After: Action is complete!");
    // Add custom logic here
  }

  toggle(action: string): any {
    this.before();
    console.log(action)
    this.state.editor.chain().focus()[action]().run();
    this.after();
  }

  toggleBold(): any {
    this.before();
    this.state.editor.chain().focus().toggleBold().run();
    this.after();
    this.state.isBold = this.state.editor.isActive("bold")
  }

}