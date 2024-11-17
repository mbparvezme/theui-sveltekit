<script lang="ts">
  import { Table } from "$lib"
  let a = {'a' : 'c', 'b' : 'd'}
  let b = ['a', 'b']
  let dataType = (d: any) => Object.prototype.toString.call(d) === "[object Object]" ? "object" : Array.isArray(d) ? "array" : false
</script>

{dataType(a)}
{dataType(b)}
