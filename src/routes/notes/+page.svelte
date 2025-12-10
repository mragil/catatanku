<script lang="ts">
  import { getUser, signout } from '$lib/api/auth.remote';

	import AddNotes from "./AddNotes.svelte";
  import ListNotes from "./ListNotes.svelte";

	const user = await getUser();
</script>

<p>Welcome {user.name}!</p>
<ListNotes />
<AddNotes />

<form {...signout}>
	<button type="submit">Sign out</button>
</form>
