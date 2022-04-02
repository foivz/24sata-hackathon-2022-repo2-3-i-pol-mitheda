<template>
  <amplify-authenticator>
    <div>
      <div class="flex bg-gray-200">
        <Sidebar />
        <Dashboard />
      </div>
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>

</template>

<script>
export default {
}
</script>
