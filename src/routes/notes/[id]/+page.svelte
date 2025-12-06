<script lang="ts">
  import { page } from '$app/state';
  import { getNoteById } from '$lib/api/notes.remote';
</script>

<h1>Note Detail</h1>

<svelte:boundary>
  {@const notes = await getNoteById(page.params.id ?? '')}
  <h2>Title: {notes.title}</h2>
  <p>Content: {notes.content}</p>

  {#snippet pending()}
    <h2>Loading...</h2>
  {/snippet}

  {#snippet failed(error, reset)}
    <h2>Error loading note with id {page.params.id}: {error}</h2>
    <button onclick={reset}>Try again</button>
  {/snippet}
</svelte:boundary>