<script lang="ts">
  import { createNote } from '$lib/api/notes.remote';
</script>

<form {...createNote}>
	<label>
		<h2>Title</h2>
    {#each createNote.fields.title.issues() as issue}
			<p class="issue">{issue.message}</p>
		{/each}
		<input {...createNote.fields.title.as('text')} />
	</label>

	<label>
		<h2>Write your note</h2>
		<textarea {...createNote.fields.content.as('text')}></textarea>
	</label>

	<button>Publish!</button>
</form>