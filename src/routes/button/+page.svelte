<script lang="ts">
  import {Button, ButtonGroup} from "$lib"

  let test = () => {
    alert("Hello")
  }

  let test2 = () => {
    alert("Hello key")
  }
</script>

<div class="grid grid-cols-2">
  <div>
    <h3 class="mb-2 text-2xl">Default button sizes</h3>
    <Button label="Button default" onclick={()=>test()} onkeydown={()=>test2()} /><br>
    <Button label="Button xs" size="xs" color="error"/>
    <Button label="Button sm" size="sm" color="info" />
    <Button label="Button md" size="md" color="success" />
    <Button label="Button lg" size="lg" color="warning" />
    <Button label="Button xl" size="xl" color="info" />

    <h3 class="mt-4 mb-2 text-2xl">Outline button sizes</h3>
    <Button label="Button default" outline /><br>
    <Button label="Button xs" outline size="xs" color="error" />
    <Button label="Button sm" outline size="sm" color="info" />
    <Button label="Button md" outline size="md" color="success" />
    <Button label="Button lg" outline size="lg" color="warning" />
    <Button label="Button xl" outline size="xl" color="info" />

    <h3 class="mt-4 mb-2 text-2xl">Default square buttons</h3>
    <Button label="df" square/><br>
    <Button label="xs" square size="xs" color="error" />
    <Button label="sm" square size="sm" color="info" />
    <Button label="md" square size="md" color="success" />
    <Button label="lg" square size="lg" color="warning" />
    <Button label="xl" square size="xl" color="info" />

    <h3 class="mt-4 mb-2 text-2xl">Outline square buttons</h3>
    <Button label="df" outline square/><br>
    <Button label="xs" outline square size="xs" color="error" />
    <Button label="sm" outline square size="sm" color="info" />
    <Button label="md" outline square size="md" color="success" />
    <Button label="lg" outline square size="lg" color="warning" />
    <Button label="xl" outline square size="xl" color="info" />

    <h3 class="mt-4 mb-2 text-2xl">Theme light button sizes</h3>
    <Button label="Button default" theme="light" /><br>
    <Button label="Button xs" theme="light" size="xs" color="error" />
    <Button label="Button sm" theme="light" size="sm" color="info" />
    <Button label="Button md" theme="light" size="md" color="success" />
    <Button label="Button lg" theme="light" size="lg" color="warning" />
    <Button label="Button xl" theme="light" size="xl" color="info" />
    
    <h3 class="mt-4 mb-2 text-2xl">Theme light square buttons</h3>
    <Button label="df" theme="light" square/><br>
    <Button label="xs" theme="light" square size="xs" />
    <Button label="sm" theme="light" square size="sm" />
    <Button label="md" theme="light" square size="md" />
    <Button label="lg" theme="light" square size="lg" />
    <Button label="xl" theme="light" square size="xl" />
    
    <h3 class="mt-4 mb-2 text-2xl">Theme gradient button sizes</h3>
    <Button label="Button default" theme="gradient" /><br>
    <Button label="Button xs" theme="gradient" size="xs" />
    <Button label="Button sm" theme="gradient" size="sm" />
    <Button label="Button md" theme="gradient" size="md" />
    <Button label="Button lg" theme="gradient" size="lg" />
    <Button label="Button xl" theme="gradient" size="xl" />
    
    <h3 class="mt-4 mb-2 text-2xl">Theme gradient square buttons</h3>
    <Button label="df" theme="gradient" square/><br>
    <Button label="xs" theme="gradient" square size="xs" />
    <Button label="sm" theme="gradient" square size="sm" />
    <Button label="md" theme="gradient" square size="md" />
    <Button label="lg" theme="gradient" square size="lg" />
    <Button label="xl" theme="gradient" square size="xl" />
    
    <h3 class="mt-4 mb-2 text-2xl">Theme gradient colors</h3>
    <Button label="Button default" theme="gradient" /><br><br>
    <Button label="Button xs" theme="gradient" gradientColors="error" />
    <Button label="Button sm" theme="gradient" gradientColors="info" />
    <Button label="Button md" theme="gradient" gradientColors="success" />
    <Button label="Button lg" theme="gradient" gradientColors="warning" />
    
    <h3 class="mt-4 mb-2 text-2xl">Button type (button, submit, reset)</h3>
    <Button label="Button type default" ariaLabel="This is aria-label" rounded="xl" />
    <Button label="Button type button" type="button" />
    <Button label="Button type submit" type="submit" />
    <Button label="Button type reset" type="reset" />
    
    <h3 class="mt-4 mb-2 text-2xl">Link Button</h3>
    <Button label="Button link" color="error" href="/alert" ariaLabel="This is aria-label" />
    <Button label="Button link" color="info" href="/alert" />
    <Button label="Button link" color="success" href="/alert" />
    <Button label="Button link" color="warning" href="/alert" />
    
    <h3 class="mt-4 mb-2 text-2xl">Link with external icon</h3>
    <Button label="Button link" color="error" href="/alert" target="_blank" />
    <Button label="Button link" color="info" href="/alert" target="_blank" />
    <Button label="Button link" color="success" href="/alert" target="_blank" />
    <Button label="Button link" color="warning" href="/alert" target="_blank" />

    <h3 class="mt-4 mb-2 text-2xl">Before & After element</h3>
    <Button>
      {#snippet beforeLabel()}
        BEF
      {/snippet}
    
      {#snippet label()}
        MAIN
      {/snippet}
    
      {#snippet afterLabel()}
        AFT
      {/snippet}
    </Button>
  </div>
  <div>
    <h3 class="mb-2 text-2xl">Default button group</h3>
    <ButtonGroup color="warning">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Stacked button group</h3>
    <ButtonGroup color="warning" stacked>
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Outline button group</h3>
    <ButtonGroup outline>
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Outline stacked slower animate ARIA group</h3>
    <ButtonGroup color="success" outline stacked animate="slower" ariaLabel="This is ARIA">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Rounded button group</h3>
    <ButtonGroup color="success" rounded="full">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Size button group</h3>
    <ButtonGroup color="success" size="xs">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup><br>
    <ButtonGroup color="success" size="xl">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Square button group</h3>
    <ButtonGroup color="success" square size="xl">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Theme light button group</h3>
    <ButtonGroup size="xl" theme="light">
      {#snippet children()}
      <Button label="Brand" />
      <Button label="Brand" />
      <Button label="Brand" color="warning" />
      <Button label="Brand" />
      <Button label="Brand" />
      {/snippet}
    </ButtonGroup>
    <ButtonGroup size="xl" theme="light" color="warning">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Theme gradient button group</h3>
    <ButtonGroup size="xl" theme="gradient" gradientColors="error">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
    <h3 class="mb-2 text-2xl">Theme gradient button group</h3>
    <ButtonGroup size="xl" stacked theme="gradient" gradientColors="error">
      {#snippet children()}
      <Button label="Button" />
      <Button label="Button" />
      <Button label="Button" color="warning" />
      <Button label="Button" />
      <Button label="Button" />
      {/snippet}
    </ButtonGroup>
  </div>
</div>
