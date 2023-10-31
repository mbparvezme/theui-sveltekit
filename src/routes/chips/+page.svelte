<script lang="ts">
  import { Chips, Container } from '$lib'
</script>

<Container>
    <Chips text="Hello" imgUrl="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"/>
    <Chips text="Hello" fill={false} imgUrl="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"/>
    <Chips/>
    <Chips fill={false}/>
</Container>