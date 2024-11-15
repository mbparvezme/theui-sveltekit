<script lang="ts">
  import {Alert} from "$lib"
</script>

<h4>Default alert</h4>
<Alert icon="danger" content="Hello alert!" dismissible/>
<Alert icon="warning" content="Hello alert!" dismissible type="warning" />
<Alert icon="info" content="Hello alert!" dismissible type="info" />
<Alert icon="success" content="Hello alert!" dismissible type="success" />

<h4>Light theme</h4>
<Alert icon="danger" content="Hello alert!" theme="light"/>
<Alert icon="warning" content="Hello alert!" theme="light" type="warning" />
<Alert icon="info" content="Hello alert!" theme="light" type="info" />
<Alert icon="success" content="Hello alert!" theme="light" type="success" />
<br>
<h4>Default border top</h4>
<Alert content="Hello alert!" variant="borderTop" />
<Alert content="Hello alert!" type="warning" variant="borderTop" />
<Alert content="Hello alert!" type="info" variant="borderTop" />
<Alert content="Hello alert!" type="success" variant="borderTop" />
<br>
<h4>Light border top</h4>
<Alert content="Hello alert!" theme="light" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="warning" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="info" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="success" variant="borderTop" />
<br>
<h4>Default border bottom</h4>
<Alert content="Hello alert!" variant="borderBottom" />
<Alert content="Hello alert!" type="warning" variant="borderBottom" />
<Alert content="Hello alert!" type="info" variant="borderBottom" />
<Alert content="Hello alert!" type="success" variant="borderBottom" />
<br>
<h4>Light border bottom</h4>
<Alert content="Hello alert!" theme="light" variant="borderBottom" />
<Alert content="Hello alert!" theme="light" type="warning" variant="borderBottom" />
<Alert content="Hello alert!" theme="light" type="info" variant="borderBottom" />
<Alert content="Hello alert!" theme="light" type="success" variant="borderBottom" />

<h4>Default border start</h4>
<Alert content="Hello alert!" variant="borderStart" />
<Alert content="Hello alert!" type="warning" variant="borderStart" />
<Alert content="Hello alert!" type="info" variant="borderStart" />
<Alert content="Hello alert!" type="success" variant="borderStart" />
<br>
<h4>Light border start</h4>
<Alert content="Hello alert!" theme="light" variant="borderStart" />
<Alert content="Hello alert!" theme="light" type="warning" variant="borderStart" />
<Alert content="Hello alert!" theme="light" type="info" variant="borderStart" />
<Alert content="Hello alert!" theme="light" type="success" variant="borderStart" />
