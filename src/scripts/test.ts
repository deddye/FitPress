import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env.development' });

console.log('🔑 OPENAI_API_KEY loaded?', !!process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function test() {
	const res = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [{ role: 'user', content: 'Say hello from FitPress!' }]
	});
	console.log(res.choices[0].message.content);
}

test();
