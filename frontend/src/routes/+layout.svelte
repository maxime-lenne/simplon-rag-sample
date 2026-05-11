<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<main class="mx-auto flex min-h-screen max-w-[760px] flex-col px-4 py-6">
  {@render children()}
</main>
