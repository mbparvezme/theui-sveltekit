<script>
  import { Badge, Container } from "$lib"
</script>

<Container>
    Default
    <!-- Indicator badge -->
    <Badge title="Hello badge" />
    <!-- Text badge -->
    <Badge text="New" />

    <div class="my-24"></div>
    Grow
    <!-- Indicator badge -->
    <p class="text-2xl">Products <Badge title="Hello badge"/></p>
    <p class="text-2xl">Products <Badge grow={true} title="Hello badge"/></p>
    <!-- Text badge -->
    <p class="text-2xl">Products <Badge text="New" /></p>
    <p class="text-2xl">Products <Badge text="New" grow={true}/></p>

    <div class="my-24"></div>
    Fixed-top
    <div class="flex items-center gap-8">
        <p class="relative p-2 bg-gray-100 dark:bg-gray-700">
        Notifications <Badge title="Hello badge" topFixed={true}/>
        </p>
    
        <p class="relative p-2 bg-yellow-100 dark:bg-gray-700">
        Notifications <Badge topFixed={true} text="New"/>
        </p>
    </div>
</Container>