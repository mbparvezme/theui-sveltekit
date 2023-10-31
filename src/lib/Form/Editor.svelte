<script lang="ts">
  import type { INPUT_CONFIG } from "$lib/types"
  import { onMount, onDestroy, getContext } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { editorData } from "$lib/stores"
  import { getRounded, generateToken, getInputContainerClass, getInputBoxClass, getFormControlStyle } from "$lib/functions"
  import { FORM, Label, Dropdown } from "$lib"

  import { Editor } from "@tiptap/core"
  import StarterKit from "@tiptap/starter-kit"
  import Underline from "@tiptap/extension-underline"
  import Image from "@tiptap/extension-image"
  import Link from "@tiptap/extension-link"
  import Placeholder from "@tiptap/extension-placeholder"
  import TextAlign from "@tiptap/extension-text-align"
  import Typography from "@tiptap/extension-typography"
  import Youtube from "@tiptap/extension-youtube"
  import { Color } from "@tiptap/extension-color"
  import TextStyle from "@tiptap/extension-text-style"
  import Highlight from "@tiptap/extension-highlight"
  import Subscript from "@tiptap/extension-subscript"
  import Superscript from "@tiptap/extension-superscript"
  
  export let id = generateToken()
  export let config : INPUT_CONFIG = {}
  export let label  : string|undefined = undefined
  export let name   : string
  export let placeholder   : string = "Write something …"
  export let value  : string = ""
  export let editorBtnClass = ""
  
  const ctx: any = getContext( FORM || {} )
  let C:INPUT_CONFIG = {rounded : "md", inputGrow: true, size: "md", variant: "bordered" }
  Object.assign(C, ctx?.formConfig||{}, config)
  
  let btnClass = () => twMerge("bg-gray-200 dark:bg-gray-800 py-2 px-2.5 border border-black/10" + getRounded(C.rounded))
  let dropdownCls = "bg-transparent text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"

  let colorPicker: HTMLInputElement
  let pickerToggle: number = 0
  let element: HTMLElement
  let editor: any
  $editorData[name] = value

  const openColorPicker = () => {
    if(pickerToggle % 2 == 0) colorPicker.showPicker()
    pickerToggle++
  }

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Underline,
        Image,
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder
        }),
        TextAlign.configure({
          types: ["heading", "paragraph", "image"],
          alignments: ["left", "center", "right", "justify"],
        }),
        Typography,
        Youtube.configure({
          ccLanguage: "en",
          interfaceLanguage: "en",
          // origin: "yourdomain.com",
          modestBranding: true, // Disables youtube name
        }),
        Color,
        TextStyle,
        Highlight.configure({
          multicolor: true
        }),
        Subscript,
        Superscript,
      ],
      content: value,
      onTransaction: () => {
        editor = editor
      },
      // onInit: () => {
      //   $editorData[name] = editor.getHTML()
      // },
      onUpdate: () => {
        $editorData[name] = editor.getHTML()
      }
    })
  })

  onDestroy(() => {if (editor) editor.destroy()})


  // const addImage = () => {
  //   const url = window.prompt("URL")
  //   if (url) {
  //     editor.chain().focus().setImage({ src: url }).run()
  //   }
  // }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)
    // cancelled
    if (url === null) {
      return
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink()
        .run()
      return
    }
    alert(url)
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url })
      .run()
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL")
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      })
    }
  }
</script>

<div class={getInputContainerClass(C)}>
  {#if editor}
    {#if $$slots.label}
      <slot name="label"/>
    {:else if label}
      <Label style={C.labelStyle} {id} {label}/>
    {/if}
  
    <div class="flex flex-wrap editor-toolbar gap-1">
      <Dropdown config={{ animation: "fade", closeOnClick: false }} align="left" >
        <button type="button" slot="label" class={twMerge(btnClass(), "w-10 h-10 rounded-md p-1 flex justify-center items-center")} aria-label="Select text headings"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11 4.002V12H9.67V8.455H6.33V12H5V4.002h1.33v3.322h3.34V4.002H11Z"/><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z"/></svg></button>
        <div class="flex flex-col">
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()} class:active={editor.isActive("heading",{level:1})}>Heading 1</button>
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 2}).run()} class:active={editor.isActive("heading",{level:2})}>Heading 2</button>
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 3}).run()} class:active={editor.isActive("heading",{level:3})}>Heading 3</button>
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 4}).run()} class:active={editor.isActive("heading",{level:4})}>Heading 4</button>
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 5}).run()} class:active={editor.isActive("heading",{level:5})}>Heading 5</button>
          <button type="button" class={dropdownCls} on:click={() => editor.chain().focus().toggleHeading({ level: 6}).run()} class:active={editor.isActive("heading",{level:6})}>Heading 6</button>
        </div>
      </Dropdown>
      <div class="editor-btn-group">
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive("bold")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive("italic")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleUnderline().run()} class:active={editor.isActive("underline") ? "is-active" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleStrike().run()} class:active={editor.isActive("strike") ? "is-active" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleSuperscript().run()} class:active={editor.isActive("superscript") ? "is-active" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m4.266 12.496.96-2.853H8.76l.96 2.853H11L7.62 3H6.38L3 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm5.132-1.797v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V6h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41C11.565 1 11 1.8 11 2.576v.06h1.146Z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleSubscript().run()} class:active={editor.isActive("subscript") ? "is-active" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m3.266 12.496.96-2.853H7.76l.96 2.853H10L6.62 3H5.38L2 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm6.132 7.203v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V15h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41-1.23 0-1.795.8-1.795 1.576v.06h1.146Z"/></svg></button>
      </div>
      <Dropdown config={{ animation: "fade", closeOnClick: false, size: "custom" }} style="--dropdown-width: 148px" >
        <button type="button" slot="label" class={twMerge(btnClass(), "w-10 h-10 rounded-md p-1 flex justify-center items-center")} aria-label="Select text headings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg></button>
        <div class="flex flex-row flex-wrap gap-1 justify-start dropdown-action-btn px-1">
          <button type="button" class={twMerge(btnClass(), "p-2")} on:click={() => editor.chain().focus().setTextAlign("left").run()} class:active={editor.isActive({ textAlign: "left" })?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg></button>
          <button type="button" class={twMerge(btnClass(), "p-2")} on:click={() => editor.chain().focus().setTextAlign("center").run()} class:active={editor.isActive({ textAlign: "center" })?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg></button>
          <button type="button" class={twMerge(btnClass(), "p-2")} on:click={() => editor.chain().focus().setTextAlign("right").run()} class:active={editor.isActive({ textAlign: "right" })?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg></button>
          <button type="button" class={twMerge(btnClass(), "p-2")} on:click={() => editor.chain().focus().setTextAlign("justify").run()} class:active={editor.isActive({ textAlign: "justify" })?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg></button>
        </div>
      </Dropdown>
      <div class="editor-btn-group">
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleBulletList().run()} class:active={editor.isActive("bulletList")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleOrderedList().run()} class:active={editor.isActive("orderedList")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/><path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().sinkListItem("listItem").run()} disabled={!editor.can().sinkListItem("listItem")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"/></svg></button>
      </div>
      <div class="editor-btn-group">
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleBlockquote().run()} class:active={editor.isActive("blockquote")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleCodeBlock().run()} class:active={editor.isActive("codeBlock")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().toggleCode().run()} class:active={editor.isActive("code")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg></button>
      </div>
      <div class="editor-btn-group">
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().setHorizontalRule().run()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z"/></svg></button>
        <button type="button" class={btnClass()} on:click={setLink} class:active={editor.isActive("link")?"is-active":""}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg></button>
        <button type="button" class={btnClass()} on:click={addYoutubeVideo}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg></button>
      </div>
      <Dropdown config={{ animation: "fade", closeOnClick: false, size: "custom" }} style="--dropdown-width: 116px" >
        <button type="button" slot="label" class={twMerge(btnClass(), "w-10 h-10 rounded-md p-1 flex justify-center items-center")} aria-label="Select text headings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07.435-.414Zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254-2.905-2.906Zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065 2.85 2.85ZM5.293 13.5 2.5 10.707v1.586L3.707 13.5h1.586Z"/></svg></button>
        <div class="flex flex-row flex-wrap gap-1 justify-start dropdown-action-btn highlighter-btn px-1">
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #fbf719" on:click={() => editor.chain().focus().toggleHighlight({color: "#fbf719"}).run()} class:active={editor.isActive("highlight", {color: "#fbf719"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #dab600" on:click={() => editor.chain().focus().toggleHighlight({color: "#dab600"}).run()} class:active={editor.isActive("highlight", {color: "#dab600"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #ffc078" on:click={() => editor.chain().focus().toggleHighlight({color: "#ffc078"}).run()} class:active={editor.isActive("highlight", {color: "#ffc078"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #e59400" on:click={() => editor.chain().focus().toggleHighlight({color: "#e59400"}).run()} class:active={editor.isActive("highlight", {color: "#e59400"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #ff7b7b" on:click={() => editor.chain().focus().toggleHighlight({color: "#ff7b7b"}).run()} class:active={editor.isActive("highlight", {color: "#ff7b7b"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #fa2f55" on:click={() => editor.chain().focus().toggleHighlight({color: "#f72f35"}).run()} class:active={editor.isActive("highlight", {color: "#f72f35"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #d896ff" on:click={() => editor.chain().focus().toggleHighlight({color: "#d896ff"}).run()} class:active={editor.isActive("highlight", {color: "#d896ff"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #800080" on:click={() => editor.chain().focus().toggleHighlight({color: "#800080"}).run()} class:active={editor.isActive("highlight", {color: "#800080"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #39ff14" on:click={() => editor.chain().focus().toggleHighlight({color: "#39ff14"}).run()} class:active={editor.isActive("highlight", {color: "#39ff14"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #00A033" on:click={() => editor.chain().focus().toggleHighlight({color: "#00A033"}).run()} class:active={editor.isActive("highlight", {color: "#00A033"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #66b2b2" on:click={() => editor.chain().focus().toggleHighlight({color: "#66b2b2"}).run()} class:active={editor.isActive("highlight", {color: "#66b2b2"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #008080" on:click={() => editor.chain().focus().toggleHighlight({color: "#008080"}).run()} class:active={editor.isActive("highlight", {color: "#008080"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #30c5ff" on:click={() => editor.chain().focus().toggleHighlight({color: "#30c5ff"}).run()} class:active={editor.isActive("highlight", {color: "#30c5ff"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #1919ff" on:click={() => editor.chain().focus().toggleHighlight({color: "#1919ff"}).run()} class:active={editor.isActive("highlight", {color: "#1919ff"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #79e9de" on:click={() => editor.chain().focus().toggleHighlight({color: "#79e9de"}).run()} class:active={editor.isActive("highlight", {color: "#79e9de"}) ? "is-active" : ""}></button>
          <button type="button" class={twMerge(btnClass(), "bg-[var(--bg-color)] rounded p-0")} style="--bg-color: #33b3a6" on:click={() => editor.chain().focus().toggleHighlight({color: "#33b3a6"}).run()} class:active={editor.isActive("highlight", {color: "#33b3a6"}) ? "is-active" : ""}></button>
        </div>
      </Dropdown>
      <button type="button" class={twMerge(btnClass(), "relative")}  on:click={openColorPicker}>
        <input type="color" class="opacity-0 absolute bottom-0 left-0 z-[-1]" bind:this={colorPicker} on:input={event => editor.chain().focus().setColor(event.target.value).run()} value={editor.getAttributes("textStyle").color} data-testid="setColor"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/></svg>
      </button>
      <div class="editor-btn-group">
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg></button>
        <button type="button" class={btnClass()} on:click={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg></button>
      </div>
    </div>
  {/if}
  <div id="editor" class={twMerge(getInputBoxClass(C, $$restProps), "block focus:border-brand")} bind:this={element} />
  <textarea class="hidden" {id} {name}>{$editorData[name]||""}</textarea>
</div>

<style lang="postcss">
  #editor {
    @apply h-auto min-h-[8rem];
  }
  button.active{
    @apply bg-gray-500 text-white;
  }
  :global(.ProseMirror){
    @apply min-h-[7rem];
  }
  :global(.ProseMirror-focused){
    @apply border-0 outline-0;
  }
  :global(#editor h1) {
    @apply text-4xl font-bold;
  }
  :global(#editor h2) {
    @apply text-3xl font-bold;
  }
  :global(#editor h3) {
    @apply text-2xl font-bold;
  }
  :global(#editor h4) {
    @apply text-xl font-bold;
  }
  :global(#editor h5) {
    @apply text-lg font-bold;
  }
  :global(#editor h6) {
    @apply text-base font-bold;
  }
  :global(#editor ul, #editor ol) {
    @apply px-4;
  }
  :global(#editor ul) {
    @apply list-disc;
  }
  :global(#editor ul ul) {
    @apply list-[circle];
  }
  :global(#editor ul ul ul) {
    @apply list-[square];
  }
  :global(#editor ul ul ul ul) {
    @apply list-disc;
  }
  :global(#editor ol) {
    @apply list-decimal;
  }
  :global(#editor ol ol) {
    @apply list-[lower-alpha];
  }
  :global(#editor ol ol ol) {
    @apply list-[lower-roman];
  }
  :global(#editor ol ol ol ol) {
    @apply list-decimal;
  }
  :global(#editor blockquote) {
    @apply pl-4 border-l-4 border-gray-900/10;
  }
  :global(#editor a) {
    @apply text-blue-700 visited:text-purple-700 underline;
  }
  :global(#editor pre) {
    font-family: "JetBrainsMono", monospace;
    @apply bg-slate-900 rounded-lg text-white py-3 px-4;
  }
  :global(#editor pre code) {
    @apply bg-transparent text-inherit text-sm p-0;
  }
  :global(#editor hr) {
    @apply border-t border-gray-500/30 !my-4;
  }
  :global(#editor code) {
    font-family: "JetBrainsMono", monospace;
    @apply bg-black/10 rounded box-decoration-clone text-inherit text-sm px-1 py-0.5;
  }
  :global(#editor p.is-editor-empty:first-child::before){
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  :global(.dropdown-action-btn.highlighter-btn button){
    @apply w-6 h-6
  }
  :global(.editor-toolbar button[disabled] svg){
    @apply opacity-25 cursor-not-allowed;
  }
  .editor-btn-group{
    @apply flex;
  }
  .editor-btn-group *:first-child{
    @apply !rounded-r-none
  }
  .editor-btn-group *:last-child{
    @apply !rounded-l-none
  }
  .editor-btn-group *:not(:first-child, :last-child){
    @apply !rounded-none
  }
</style>