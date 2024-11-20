<script lang="ts">
  import type { DROPDOWN_ITEM } from "$lib/types"
  import { Dropdown, DropdownItem, Close, Container } from "$lib"

  let data: DROPDOWN_ITEM[] = [
    {
      text: "Home Home Home Home",
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

<Container class="flex flex-col gap-8">
  <div>
    <h3>Animation speed</h3>
    <div class="flex flex-wrap gap-8">
      <Dropdown label="Animate faster" align="start" animation="zoom-out" headerClasses="text-brand-primary-500" dropdownEvent="hover">
        {#each data as dd}
          <DropdownItem type={dd?.type} url={dd?.url} text={dd.text} />
        {/each}
      </Dropdown>
      <!-- <Dropdown label="Animate fast" align="start" animate="fast">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate normal" align="start" animate="normal">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slow" align="start" animate="slow">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slower" align="start" animate="slower">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown> -->
    </div>
  </div>

  <!-- <div>
    <h3>Animation type</h3>
    <div class="flex flex-wrap gap-8">
      <Dropdown label="Fade (Default)" align="start" animation="fade">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slide-down" align="start" animation="slide-down">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slide-left" animation="slide-left" size="lg">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slide-right" animation="slide-right" size="lg">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate slide-up" align="start" animation="slide-up">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate zoom-in" align="start" animation="zoom-in">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate zoom-out" align="start" animation="zoom-out">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
    </div>
  </div>

  <div>
    <h3>Align</h3>
    <div class="flex flex-wrap gap-8">
      <Dropdown label="Align left" align="start">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Animate right" align="end">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
    </div>
  </div>


  <div>
    <h3>Backdrop</h3>
    <Dropdown label="Custom backdrop"backdrop="bg-red-500/30">
      {#each data as dd}
        <DropdownItem url={dd.url} text={dd.text} />
      {/each}
    </Dropdown>
  </div>

  <div>
    <h3>Size</h3>
    <div class="flex flex-wrap gap-8">
      <Dropdown label="Size sm" align="start" size="sm">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Size md" align="start" size="md">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Size lg" align="start" size="lg">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Size full" align="start" size="full">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text} />
        {/each}
      </Dropdown>
      <Dropdown label="Size sm" align="start" size="auto">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text + "AAA BBB CCC DDD"} class="text-nowrap" />
        {/each}
      </Dropdown>
      <Dropdown label="Size custom 300" align="start" size="custom" style="--dropdown-width: 380px">
        {#each data as dd}
          <DropdownItem url={dd.url} text={dd.text + "AAA BBB CCC DDD"} class="text-nowrap" />
        {/each}
      </Dropdown>
    </div>
  </div>

  <div class="py-8"></div>
  <Dropdown label="Dropdown" align="start">
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
  </Dropdown> -->
</Container>