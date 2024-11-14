<script lang="ts">
  import {Notification, notify} from "$lib"
</script>

<Notification />

<h4 class="text-2xl">Default style</h4>
<button type="button" onclick={() => notify("Hello", "error")}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success")}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning")}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info")}>Info notification</button><br><br>

<h4 class="text-2xl">Light style</h4>
<button type="button" onclick={() => notify("Hello", "error", {theme: "light"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {theme: "light"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {theme: "light"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {theme: "light"})}>Info notification</button><br>

<h4 class="text-2xl">Default border-top style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderTop"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderTop"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderTop"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderTop"})}>Info notification</button><br><br>

<h4 class="text-2xl">Light border-top style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderTop", theme: "light"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderTop", theme: "light"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderTop", theme: "light"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderTop", theme: "light"})}>Info notification</button><br>

<h4 class="text-2xl">Default border-bottom style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderBottom"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderBottom"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderBottom"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderBottom"})}>Info notification</button><br><br>

<h4 class="text-2xl">Light border-bottom style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderBottom", theme: "light"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderBottom", theme: "light"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderBottom", theme: "light"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderBottom", theme: "light"})}>Info notification</button><br>

<h4 class="text-2xl">Default border-start style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderStart"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderStart"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderStart"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderStart"})}>Info notification</button><br><br>

<h4 class="text-2xl">Light border-start style</h4>
<button type="button" onclick={() => notify("Hello", "error", {variant: "borderStart", theme: "light"})}>Default/Error notification</button><br>
<button type="button" onclick={() => notify("Hello", "success", {variant: "borderStart", theme: "light"})}>Success notification</button><br>
<button type="button" onclick={() => notify("Hello", "warning", {variant: "borderStart", theme: "light"})}>Warning notification</button><br>
<button type="button" onclick={() => notify("Hello", "info", {variant: "borderStart", theme: "light"})}>Info notification</button><br>
