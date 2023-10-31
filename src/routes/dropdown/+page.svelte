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
    // {
    //   type: 'divider'
    // },
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

</script>

<Container>
    <Dropdown label="Dropdown" items={data} align="left" itemConfig={{headerClass: "bg-gray-100"}}/>
    <div class="py-8"></div>
    <Dropdown label="Dropdown" align="left">
      <DropdownItem item={item1}>
        <Close slot="startItem" />
        <Close slot="endItem" />
      </DropdownItem>
      <DropdownItem item={item2} itemConfig={{headerClass: "border-y"}}>
        <Close slot="startItem" />
        <Close slot="endItem" />
      </DropdownItem>
    </Dropdown>
</Container>