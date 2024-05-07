<script lang="ts">
  import {Notification, notify} from "$lib"
  import {Button, Container} from "$lib"

  let showNotification = (type: any, variant: any = "card") => {
    notify("Hello "+ type, type, {variant: variant, rounded: "md"})
  }

</script>

<Notification />

<Container>
  <p>Notification type</p>
  <Button label="Notification Error (default)" on:click={() => showNotification('error')} />
  <Button label="Notification Success" on:click={() => showNotification('success')} />
  <Button label="Notification Info" on:click={() => showNotification('info')} />
  <Button label="Notification Warning" on:click={() => showNotification('warning')} />
  <p class="pt-8">Notification variant: CardLight</p>
  <Button label="Card Light Error (default)" on:click={() => showNotification('error', "cardLight")} />
  <Button label="Card Light Success" on:click={() => showNotification('success', "cardLight")} />
  <Button label="Card Light Info" on:click={() => showNotification('info', "cardLight")} />
  <Button label="Card Light Warning" on:click={() => showNotification('warning', "cardLight")} />
  <p class="pt-8">Notification variant: borderTop</p>
  <Button label="Border Top Error (default)" on:click={() => showNotification('error', "borderTop")} />
  <Button label="Border Top Success" on:click={() => showNotification('success', "borderTop")} />
  <Button label="Border Top Info" on:click={() => showNotification('info', "borderTop")} />
  <Button label="Border Top Warning" on:click={() => showNotification('warning', "borderTop")} />
  <p class="pt-8">Notification variant: borderBottom</p>
  <Button label="Border Bottom Error (default)" on:click={() => showNotification('error', "borderBottom")} />
  <Button label="Border Bottom Success" on:click={() => showNotification('success', "borderBottom")} />
  <Button label="Border Bottom Info" on:click={() => showNotification('info', "borderBottom")} />
  <Button label="Border Bottom Warning" on:click={() => showNotification('warning', "borderBottom")} />
  <p class="pt-8">Notification variant: borderStart</p>
  <Button label="Border Start Error (default)" on:click={() => showNotification('error', "borderStart")} />
  <Button label="Border Start Success" on:click={() => showNotification('success', "borderStart")} />
  <Button label="Border Start Info" on:click={() => showNotification('info', "borderStart")} />
  <Button label="Border Start Warning" on:click={() => showNotification('warning', "borderStart")} />
</Container>


