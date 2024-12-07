<script lang="ts">
    interface Props {
    children?: Snippet,
    trigger: string,
    placement?: 'top' | 'right' | 'bottom' | 'left',
    triggerEvent?: 'click' | 'hover',
  }

  let {
    children,
    trigger,
    placement = 'top',
    triggerEvent = 'click',
  }: Props = $props()

  let popoverElement: HTMLElement | null = $state(null);
  let triggerElement: HTMLElement | null = $state(null);

  // This function calculates the popover's position based on the placement
  const positionPopover = () => {
    if (!triggerElement || !popoverElement) return { left: "0px", top: "0px" };

    const triggerRect = triggerElement.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();
    const arrowSize = 6;

    console.log(triggerRect)

    let top = "0px";
    let left = "0px";

    switch (placement) {
      case "top":
        top = `${triggerRect.top - popoverRect.height - arrowSize}px`;
        left = `${(triggerRect.left + triggerRect.width) / 2 - (popoverRect.width / 2)}px`;
        break;
      case "bottom":
        top = `${triggerRect.bottom + arrowSize}px`;
        left = `${triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2}px`;
        break;
      case "left":
        top = `${triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2}px`;
        left = `${triggerRect.left - popoverRect.width - arrowSize}px`;
        break;
      case "right":
        top = `${triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2}px`;
        left = `${triggerRect.right + arrowSize}px`;
        break;
    }

    return { top, left };
  };

  let showPopover:boolean = $state(false);

  // This will toggle the visibility of the popover
  const togglePopover = () => {
    showPopover = !showPopover;
  };

  // Trigger element is assigned using `on:mount`
  import { onMount, type Snippet } from "svelte";
  onMount(() => {
    triggerElement = document.getElementById(trigger);
    if (triggerElement) {
      triggerElement.addEventListener("mouseenter", togglePopover);
      triggerElement.addEventListener("mouseleave", togglePopover);
    }
  });

  // Cleanup event listeners when component is destroyed
  import { onDestroy } from "svelte";
  onDestroy(() => {
    if (triggerElement) {
      triggerElement.removeEventListener("mouseenter", togglePopover);
      triggerElement.removeEventListener("mouseleave", togglePopover);
    }
  });
</script>
<div class="relative">
  <!-- Popover Element -->
  {#if showPopover}
    <div
      bind:this={popoverElement}
      class="absolute bg-white shadow-lg p-3 rounded-md z-10"
      style="left: {positionPopover().left}; top: {positionPopover().top};"
    >
      {@render children?.()}
      <div class="absolute w-3 h-3 bg-white rotate-45 border border-gray-300 z-10" style="top: -6px; left: 50%; margin-left: -5px;"></div>
    </div>
  {/if}
</div>
