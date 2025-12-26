<script lang="ts">
	import { slide } from 'svelte/transition';

	import { signup } from '$lib/api/auth.remote';
	import { cn } from '$lib/utils/cn';
	import { signupSchema } from '$lib/schema/auth';

	let shouldShowRootIssuses = $state(true);
</script>

<div class="">
	<h1 class="mb-14 text-center">Sign up to save your note</h1>

	<form {...signup} {...signup.preflight(signupSchema)} class="grid gap-5 grid-rows-3 items-center justify-center">
		<label>
			<input
				{...signup.fields.name.as('text')}
				placeholder="Name"
				oninput={() => {
						signup.validate({ preflightOnly: true });
						shouldShowRootIssuses = false;
					}
				}
				class={cn(
					'w-full md:w-96 rounded-lg border-b-8 p-4 pe-12 text-md bg-transparent',
					signup.fields?.name?.issues()?.length ?? 0 > 0
						? 'border-red-500'
						: 'border-black'
				)}
			/>
			{#each signup.fields.name.issues() ?? [] as issue}
				<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
			{/each}
		</label>

		<label>
			<input
				{...signup.fields.email.as('text')}
				placeholder="Email"
				oninput={() => {
						signup.validate({ preflightOnly: true });
						shouldShowRootIssuses = false;
					}
				}
				class={cn(
					'w-full md:w-96 rounded-lg border-b-8 p-4 pe-12 text-md bg-transparent',
					signup.fields?.email?.issues()?.length ?? 0 > 0
						? 'border-red-500'
						: 'border-black'
				)}
			/>
			{#each signup.fields.email.issues() ?? [] as issue}
				<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
			{/each}
		</label>

		<label>
			<input
				{...signup.fields.password.as('password')}
				type="password"
				oninput={() => {
						signup.validate( { preflightOnly: true });
						shouldShowRootIssuses = false;
					}
				}
				placeholder="Password"
				class={cn(
					'w-full md:w-96 rounded-lg border-b-8 p-4 pe-12 text-md bg-transparent',
					signup.fields?.password?.issues()?.length ?? 0 > 0
						? 'border-red-500'
						: 'border-black'
				)}
			/>

			{#each signup.fields.password.issues() ?? [] as issue}
				<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
			{/each}
		</label>
		{#each signup.fields.allIssues()?.filter((issue) => issue.path.length === 0) ?? [] as issue}
			{#if shouldShowRootIssuses}
				<p class="issue text-red-500 mt-2" transition:slide>{issue.message}</p>
			{/if}
		{/each}
		<button {...signup.buttonProps.enhance(async ({ submit }) => {
			await submit();
			shouldShowRootIssuses = true;
		})}type="submit" class="p-4 border-black border-2 rounded-xl">Sign up</button>
	</form>
</div>
