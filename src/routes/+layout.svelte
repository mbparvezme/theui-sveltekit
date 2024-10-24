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
            <NavLink href="/drawer">Drawer</NavLink>
            <NavLink href="/dropdown">Dropdown</NavLink>
            <NavLink href="/modal">Modal</NavLink>
          </div>
          <div>
            <NavLink href="/notification">Notification</NavLink>
            <NavLink href="/pagination">Pagination</NavLink>
            <NavLink href="/popup">Popup</NavLink>
            <NavLink href="/progress-bar">Progress bar</NavLink>
            <NavLink href="/tab">Tab</NavLink>
            <NavLink href="/table">Table</NavLink>
            <NavLink href="/tooltip">Tooltip</NavLink>
          </div>
        </div>
      </NavDropdown>
      <NavDropdown label="Form & Inputs" animation='fade'>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <NavLink href="/form/checkbox">Checkbox</NavLink>
            <NavLink href="/form/editor">Editor</NavLink>
            <NavLink href="/form/file-input">File input</NavLink>
            <NavLink href="/form/input">Text input</NavLink>
          </div>
          <div>
            <NavLink href="/form/label">Label</NavLink>
            <NavLink href="/form/radio-button">Radio button</NavLink>
            <NavLink href="/form/select">Select</NavLink>
            <NavLink href="/form/toggle">Toggle</NavLink>
          </div>
        </div>
      </NavDropdown>
      <NavLink href="/form">Form</NavLink>
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
