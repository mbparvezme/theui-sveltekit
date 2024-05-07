<script>
  import { DarkMode, Navbar, NavDropdown, NavBrand, NavLink, NavContainer, NavToggle } from '$lib'
  import "../app.postcss";
  import "$lib/style.postcss"
</script>

<Navbar scrollBehavior="default" mobileNavOn="md">
  <NavBrand href="/">
    <!-- <span class="flex items-baseline font-title font-bold">theui<sub class="text-gray-500 font-normal text-sm">.xyz</sub></span> -->
  </NavBrand>

    <NavContainer>
      <NavLink href="/">Home</NavLink>
      <NavDropdown label="Components" animation='fade'>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <NavLink href="/accordion">Accordion</NavLink>
            <NavLink href="/alert">Alert</NavLink>
            <NavLink href="/badge">Badge</NavLink>
            <NavLink href="/breadcrumb">Breadcrumb</NavLink>
            <NavLink href="/button">Button</NavLink>
            <NavLink href="/chips">Chips</NavLink>
            <NavLink href="/collapse">Collapse</NavLink>
            <NavLink href="/dropdown">Dropdown</NavLink>
            <NavLink href="/modal">Modal</NavLink>
            <NavLink href="/notification">Notification</NavLink>
          </div>
          <div>
            <NavLink href="/offcanvas">Offcanvas</NavLink>
            <NavLink href="/pagination">Pagination</NavLink>
            <NavLink href="/popup">Popup</NavLink>
            <NavLink href="/progress-bar">Progress bar</NavLink>
            <NavLink href="/tab">Tab</NavLink>
            <NavLink href="/table">Table</NavLink>
            <NavLink href="/tooltip">Tooltip</NavLink>
          </div>
        </div>
      </NavDropdown>
      <NavLink href="/form">Form</NavLink>
      <NavDropdown label="Form" megaMenu={true}>
        <NavLink href="/form/file">File</NavLink>
        <NavLink href="/form/editor">Editor</NavLink>
      </NavDropdown>
    </NavContainer>
    <NavContainer align="right">
      <NavLink href="/">About</NavLink>
      <NavLink href="/all">Contact</NavLink>
      <NavLink href="/table">Support</NavLink>
    </NavContainer>

  <div class="flex items-center transition-none">
    <DarkMode />
    <NavToggle />
  </div>
</Navbar>

<slot />
