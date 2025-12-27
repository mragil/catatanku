<script lang="ts">
	let { children } = $props();
</script>

<main>
	<div class="h-screen grid place-items-center">
		<div class="font-display mx-auto my-auto max-w-2xl">
			{@render children()}
		</div>
	</div>
</main>
