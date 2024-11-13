<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { twMerge } from "tailwind-merge"
  import { notifications, removeNotification } from "$lib/state.svelte"
  import type { NOTIFICATION_POSITION } from "$lib/vars"
  import { notificationClasses } from "$lib/functions"

  interface Props {
    position?: NOTIFICATION_POSITION
    animate?: boolean,
    [key: string] : unknown // class
  }

  let {
    position = "top-right",
    animate = true,
    ...props
  } : Props = $props()

</script>

{#if notifications?.value?.length}
<ul class="theui-notifications z-[70] {position}">
  {#each notifications.value as notification}
  <li class="notification">
    {#if animate}
      <div class={twMerge(notificationClasses(notification.CONFIG, notification.type), (props?.class || "") as string)} role="alert" aria-live="assertive" aria-atomic="true" in:fly={{ y: 16 }} out:fade onclick={() => {notification.CONFIG.removeOnClick===false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role="alert" aria-live="assertive" aria-atomic="true">{@html notification.msg}</span>
      </div>
    {:else}
      <div class={twMerge(notificationClasses(notification.CONFIG, notification.type), (props?.class || "") as string)} role="alert" aria-live="assertive" aria-atomic="true" onclick={() => {notification.CONFIG.removeOnClick === false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role="alert" aria-live="assertive" aria-atomic="true">{@html notification.msg}</span>
      </div>
    {/if}
  </li>
  {/each}
</ul>
{/if}

<style lang="postcss">
  .theui-notifications{
    @apply fixed list-none flex flex-col p-4;
  }
  .theui-notifications.top-left, .theui-notifications.top-center, .theui-notifications.top-right{
    @apply justify-start top-0;
  }
  .theui-notifications.bottom-left, .theui-notifications.bottom-center, .theui-notifications.bottom-right{
    @apply justify-end bottom-0;
  }
  .theui-notifications.bottom-center, .theui-notifications.top-center{
    @apply items-center left-0 right-0 w-full;
  }
  .theui-notifications.bottom-right, .theui-notifications.top-right{
    @apply items-end right-0;
  }
  .theui-notifications.bottom-left, .theui-notifications.top-left{
    @apply items-start left-0;
  }
  .theui-notifications.top-left .notification, .theui-notifications.top-center .notification, .theui-notifications.top-right .notification{
    @apply mb-4;
  }
  .theui-notifications.bottom-left .notification, .theui-notifications.bottom-center .notification, .theui-notifications.bottom-right .notification{
    @apply mt-4;
  }
</style>