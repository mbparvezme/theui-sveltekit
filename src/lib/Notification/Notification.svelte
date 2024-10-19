<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { twMerge } from "tailwind-merge"
  import { notifications, removeNotification, getClasses } from "./Store"
  export let position : "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left" = "top-right"
  export let animate: boolean = true
</script>

{#if $notifications.length}
<ul class="theui-notifications z-[70] {position}">
  {#each $notifications as notification}
  <li class="notification">
    {#if animate}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <div class={twMerge(getClasses(notification.CONFIG, notification.type), $$props?.class)} role="alert" aria-live="assertive" aria-atomic="true" in:fly={{ y: 16 }} out:fade on:click={() => {notification.CONFIG.removeOnClick===false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role="alert" aria-live="assertive" aria-atomic="true">{@html notification.msg}</span>
      </div>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <div class={twMerge(getClasses(notification.CONFIG, notification.type), $$props?.class)} role="alert" aria-live="assertive" aria-atomic="true" on:click={() => {notification.CONFIG.removeOnClick === false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role="alert" aria-live="assertive" aria-atomic="true">{@html notification.msg} {notification.CONFIG.id}</span>
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