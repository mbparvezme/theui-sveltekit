<script lang="ts">
  import type { DROPDOWN_ITEM } from "$lib/types"
  import { Dropdown, DropdownItem, Close, Container } from "$lib"

  let data = [
    {
      text: "Home",
      url: "https://www.theui.xyz",
    },
    {
      text: "Docs",
      url: "https://www.theui.xyz/docs",
    },
    {
      text: "Social medias",
      type: 'header'
    },
    {
      url: "https://facebook.com",
      text: "Facebook",
    },
    {
      text: "Instagram",
      url: "https://instagram.com",
    },
    {
      text: "Twitter",
      url: "https://twitter.com",
    },
  ]

  let item1: DROPDOWN_ITEM = {
    text: "Facebook",
    url: "https://www.com"
  }

  let item2: DROPDOWN_ITEM = {
    text: "Facebook",
    type: "header"
  }

  let test = () => {
    alert("Hello")
  }

</script>

<Container>
  <!-- <Dropdown label="Dropdown" items={data} align="left" headerClass="bg-gray-100"/> -->
  <div class="py-8"></div>
  <Dropdown label="Dropdown" align="left">
    <DropdownItem url={item1.url} text={item1.text} >
      <Close slot="startItem" />
      <Close slot="endItem" />
    </DropdownItem>
    <DropdownItem url={item2.url} text={item2.text} headerClass="border-y">
      <Close slot="startItem" />
      <Close slot="endItem" />
    </DropdownItem>
    <DropdownItem type="button" text={item2.text} headerClass="border-y">
      <Close slot="startItem" />
      <Close slot="endItem" />
    </DropdownItem>
  </Dropdown>
</Container>