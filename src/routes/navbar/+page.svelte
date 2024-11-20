<script lang="ts">
  import {Navbar, NavCollapse, NavBrand, NavToggle, NavLinkGroup, NavLink, NavDropdown} from "$lib"
</script>

<Navbar class="bg-brand-primary-100" navInnerClasses="py-0" scrollBehavior="default" mobileNavOn="lg" dropdownEvent="hover">
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
            <NavLink href="https://google.com" text="Google" />
            <NavLink href="https://google.com" text="Google" />
            <NavLink href="https://google.com" text="Google" />
            <NavLink href="https://google.com" text="Google" />
            <NavDropdown label="Dropdown" align="end" size="sm" megaMenu={true}>
              <NavLink href="/" text="All products" />
            </NavDropdown>
          {/snippet}
        </NavLinkGroup>
      {/snippet}
    </NavCollapse>
    <NavToggle />
  {/snippet}
</Navbar>