<script>
  import { DarkMode, Navbar, NavCollapse, NavDropdown, NavBrand, NavLink, NavContainer, NavToggle } from '$lib'
  import "../app.postcss";
  import "$lib/style.postcss"
</script>

<Navbar scrollBehavior="default" mobileNavOn="md">
  <NavBrand href="/">
    <span class="flex items-baseline font-title font-bold">theui<sub class="text-gray-500 font-normal text-sm">.xyz</sub></span>
  </NavBrand>

  <NavCollapse>
    <NavContainer>
      <NavLink href="/">Home</NavLink>
      <NavDropdown label="Components" animation='fade'>
        <NavLink href="/accordion">Accordion</NavLink>
        <NavLink href="/alert">Alert</NavLink>
        <NavLink href="/badge">Badge</NavLink>
        <NavLink href="/breadcrumb">Breadcrumb</NavLink>
        <NavLink href="/button">Button</NavLink>
        <NavLink href="/chips">Chips</NavLink>
        <NavLink href="/collapse">Collapse</NavLink>
        <NavLink href="/dropdown">Dropdown</NavLink>
        <NavLink href="/tooltip">Tooltip</NavLink>
        <NavLink href="/table">Table</NavLink>
      </NavDropdown>
      <NavDropdown label="Form" megaMenu={true}>
        <NavLink href="/form/editor">Editor</NavLink>
      </NavDropdown>
      <NavLink href="/new">New</NavLink>
      <NavLink href="/forms">Forms</NavLink>
      <NavLink href="/table">Table</NavLink>
      <NavDropdown label="Dropdown fade" align="right" animation='fade'>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
      </NavDropdown>
    </NavContainer>

    <NavContainer align="right">
      <NavLink href="/">About</NavLink>
      <NavLink href="/all">Contact</NavLink>
      <NavLink href="/table">Support</NavLink>
    </NavContainer>
  </NavCollapse>

  <div class="flex items-center transition-none">
    <DarkMode />
    <NavToggle />
  </div>
</Navbar>

<slot />
