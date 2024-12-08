<script lang="ts">
	import '../app.css'
	import {Navbar, NavCollapse, NavBrand, NavToggle, NavLinkGroup, NavLink, NavDropdown, DarkMode} from "$lib"
	import { onMount } from 'svelte'
	let { children } = $props()

	onMount(()=>{
		document.getElementById('toggleDirection')?.addEventListener('click', () => {
			document.documentElement.dir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'
		})
	})
</script>

<Navbar class="bg-brand-primary-100 dark:bg-brand-primary-700" scrollBehavior="shrinkAndHide" mobileNavOn="md">
  {#snippet children()}
    <NavBrand href="/">
      {#snippet children()}
        Logo
      {/snippet}
    </NavBrand>
    <NavCollapse>
      {#snippet children()}
        <NavLinkGroup>
          {#snippet children()}
						<NavDropdown label="Components">
              <div class="grid grid-cols-1">
								<NavLink href="/accordion" text="Accordion" />
								<NavLink href="/alert" text="Alert" />
								<NavLink href="/badge" text="Badge" />
								<NavLink href="/breadcrumb" text="Breadcrumb" />
								<NavLink href="/button" text="Button" />
								<NavLink href="/card" text="Card" />
								<NavLink href="/chips" text="Chips" />
								<NavLink href="/collapse" text="Collapse" />
								<NavLink href="/drawer" text="Drawer" />
								<NavLink href="/dropdown" text="Dropdown" />
								<NavLink href="/list-group" text="List group" />
								<NavLink href="/modal" text="Modal" />
								<NavLink href="/notification" text="Notification" />
								<NavLink href="/pagination" text="Pagination" />
								<NavLink href="/popover" text="Popover" />
								<NavLink href="/popup" text="Popup" />
								<NavLink href="/progress" text="Progress" />
								<NavLink href="/slider" text="Slider" />
								<NavLink href="/tab" text="Tab" />
								<NavLink href="/table" text="Table" />
								<NavLink href="/tooltip" text="Tooltip" />
              </div>
            </NavDropdown>
						<NavDropdown label="Form components">
              <div class="grid grid-cols-1">
								<NavLink href="/form/fieldset" text="Fieldset" />
								<NavLink href="/form/file-input" text="File input" />
								<NavLink href="/form/input" text="Input" />
								<NavLink href="/form/checkbox" text="Checkbox" />
								<NavLink href="/form/radio" text="Radio" />
								<NavLink href="/form/select" text="Select" />
								<NavLink href="/form/toggle" text="Toggle" />
							</div>
						</NavDropdown>
						{/snippet}
					</NavLinkGroup>
					{/snippet}
				</NavCollapse>
			<DarkMode />
			<button class="px-4 active:bg-brand-primary-500 active:text-on-brand-primary-500" id="toggleDirection">RTL/LTR</button>
    <NavToggle />
  {/snippet}
</Navbar>

<div class="px-8 pt-32 pb-48">
	{@render children()}
</div>
