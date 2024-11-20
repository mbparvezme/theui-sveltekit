<script lang="ts">
  import {Tabs, Tab, TabPanel} from "$lib"
</script>

<Tabs variant="tabs">
  {#snippet tabList()}
    <Tab>
      {#snippet children()}
        A
      {/snippet}
    </Tab>
    <Tab>
      {#snippet children()}
        B
      {/snippet}
    </Tab>
  {/snippet}
  {#snippet tabPanel()}
    <TabPanel>
      {#snippet children()}
        A panel
      {/snippet}
    </TabPanel>
    <TabPanel>
      {#snippet children()}
        B panel
      {/snippet}
    </TabPanel>
  {/snippet}
</Tabs>