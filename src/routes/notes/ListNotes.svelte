<script lang="ts">
  import { getNotes } from '$lib/api/notes.remote';
</script>

<svelte:boundary>
	<ul>
		{#each await getNotes() as note}
			<li><a href="/notes/{note.id}">{note.title}</a></li>
		{/each}
	</ul>

	{#snippet pending()}
		Loading notes...
	{/snippet}

	{#snippet failed(error, reset)}
		<p>Error loading notes: {error}</p>
		<button onclick={reset}>try again</button>
	{/snippet}
</svelte:boundary>
