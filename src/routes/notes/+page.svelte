<script lang="ts">
	import { getUser, signout } from '$lib/api/auth.remote';

	import AddNotes from './AddNotes.svelte';
	import ListNotes from './ListNotes.svelte';

	const user = await getUser();
</script>

<div>
	<p>Welcome {user.name}!</p>
	<ListNotes />
	<AddNotes />
</div>

<form {...signout.for('signout')}>
	<button type="submit">Sign out</button>
</form>
