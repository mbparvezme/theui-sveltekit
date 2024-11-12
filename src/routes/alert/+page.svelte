<script lang="ts">
  import Alert from "$lib/Alert/Alert.svelte"
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
<h4>Default border variant</h4>
<Alert content="Hello alert!" variant="borderTop" />
<Alert content="Hello alert!" type="warning" variant="borderTop" />
<Alert content="Hello alert!" type="info" variant="borderTop" />
<Alert content="Hello alert!" type="success" variant="borderTop" />
<br>
<h4>Light border variant</h4>
<Alert content="Hello alert!" theme="light" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="warning" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="info" variant="borderTop" />
<Alert content="Hello alert!" theme="light" type="success" variant="borderTop" />
