import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { fail } from '@sveltejs/kit';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();

		if (!email || !email.includes('@')) {
			return fail(400, { error: 'Please enter a valid email.' });
		}

		const { error } = await supabase.from('subscriptions').insert({ email });

		if (error) {
			if (error.code === '23505') {
				// unique violation (email already exists)
				return { success: true, message: "You're already subscribed!" };
			}
			return fail(500, { error: 'Subscription failed. Try again later.' });
		}

		return { success: true, message: 'Thanks for subscribing!' };
	}
};
