<script lang="ts">
	import { slide } from 'svelte/transition';

	import { login } from '$lib/api/auth.remote';
	import { cn } from '$lib/utils/cn';
</script>

<form {...login} class="grid gap-5 grid-rows-3 items-center justify-center">
	<label class="">
		<input
			{...login.fields.email.as('email')}
			placeholder="Email"
			oninput={() => login.validate()}
			class={cn(
				'w-full md:w-96 rounded-lg border-b-8 p-4 pe-12 text-md bg-transparent',
				login.fields?.email?.issues()?.length ?? 0 > 0
					? 'border-red-500'
					: 'border-black'
			)}
			/>
			{#each login.fields.email.issues() ?? [] as issue}
				<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
			{/each}
	</label>
	<label>
		<input
			{...login.fields.password.as('password')}
			placeholder="Password"
			oninput={() => login.validate()}
			class={cn(
				'w-full md:w-96 rounded-lg border-b-8 p-4 pe-12 text-md bg-transparent',
				login.fields?.password?.issues()?.length ?? 0 > 0
					? 'border-red-500'
					: 'border-black'
			)}		/>
		{#each login.fields.password.issues() ?? [] as issue}
			<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
		{/each}
	</label>
	{#each login.fields.allIssues()?.filter((issue) => issue.path.length === 0) ?? [] as issue}
		<p class="issue text-red-500 text-center" transition:slide>{issue.message}</p>
	{/each}
	<p class="text-center">
		Don't have an account? <br />
		<a href="/auth/signup" class="text-blue-500">Sign up</a>
	</p>
	<button type="submit" class="p-4 border-black border-2 rounded-xl">Login</button>
</form>
