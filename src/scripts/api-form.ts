// Shared form handling for backend forms (ApiForm and the footer reminder form): in-page validation, "Sending…",
// a role="status" success message and a role="alert" error. A form opts in with data-endpoint.
import { BACKEND_URL } from '../data/backend';

// Only forms with an endpoint are sent; the others stay as static layouts for now.
document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
	const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
	const label = button.textContent ?? '';
	const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
	type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
	const controls = [...form.querySelectorAll<Control>('input, select, textarea')];

	const messageFor = (el: Control) => {
		const name = (el.labels?.[0]?.textContent ?? 'this field').replace('*', '').replace(/\(.*?\)/, '').trim().toLowerCase();
		if (el instanceof HTMLInputElement && el.type === 'checkbox') return 'Tick the box to continue.';
		if (el.validity.valueMissing) return el instanceof HTMLSelectElement ? `Choose a ${name}.` : `Enter the ${name}.`;
		if (el.validity.typeMismatch)
			return el.type === 'url' ? 'Enter a full web address, like https://example.org.' : 'Enter a valid email address, like name@example.org.';
		if (el.validity.rangeUnderflow) return `Enter a number of at least ${(el as HTMLInputElement).min}.`;
		if (el.validity.badInput) return 'Enter a number.';
		return el.validationMessage;
	};
	const check = (el: Control) => {
		const box = form.querySelector<HTMLElement>(`#${el.id}-error`);
		// The browser only applies minlength to typed input, so check it for every value.
		const min = 'minLength' in el ? el.minLength : -1;
		let problem = min > 0 && el.value && el.value.length < min ? `Enter at least ${min} characters.` : '';
		if (el instanceof HTMLInputElement && el.type === 'file' && el.files) {
			const maxFiles = Number(el.dataset.maxFiles || Infinity);
			const maxBytes = Number(el.dataset.maxMb || Infinity) * 1024 * 1024;
			const allowed = el.accept ? el.accept.split(',').map((s) => s.trim().toLowerCase()) : [];
			const files = [...el.files];
			if (files.length > maxFiles) problem = `Choose up to ${maxFiles} files.`;
			else if (files.some((f) => f.size > maxBytes)) problem = `Each file must be ${el.dataset.maxMb} MB or smaller.`;
			else if (allowed.length && files.some((f) => !allowed.some((ext) => f.name.toLowerCase().endsWith(ext))))
				problem = `Use ${allowed.join(', ').replace(/\./g, '').toUpperCase()} files only.`;
		}
		el.setCustomValidity(problem);
		const ok = el.checkValidity();
		el.setAttribute('aria-invalid', String(!ok));
		if (box) {
			box.hidden = ok;
			box.textContent = ok ? '' : messageFor(el);
		}
		return ok;
	};

	controls.forEach((el) => {
		el.addEventListener('blur', () => el.value && check(el));
		el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && check(el));
		el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && check(el));
	});

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		formError.hidden = true;
		const invalid = controls.filter((el) => !check(el));
		if (invalid.length > 0) {
			invalid[0].focus();
			return;
		}
		button.disabled = true;
		button.textContent = 'Sending…';
		try {
			// Checkboxes marked data-local are only checked here and never sent.
			const entries = [...new FormData(form)].filter(
				([key, value]) => !form.querySelector(`[name="${key}"][data-local]`) && !(value instanceof File && value.size === 0),
			);
			let init: RequestInit;
			if (form.dataset.encoding === 'multipart') {
				// No Content-Type header: the browser sets it, with the boundary. Each file is sent as "files".
				const body = new FormData();
				entries.forEach(([key, value]) => body.append(key, value));
				init = { method: 'POST', body };
			} else {
				init = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(Object.fromEntries(entries.map(([key, value]) => [key, String(value)]))),
				};
			}
			const res = await fetch(BACKEND_URL + form.dataset.endpoint, init);
			// Any non-2xx, including 429 from the rate limiter, shows the same message.
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const done = document.createElement('p');
			done.className = 'form-done';
			done.setAttribute('role', 'status');
			done.textContent = form.dataset.success ?? 'Thanks! We’ll be in touch soon.';
			form.replaceWith(done);
		} catch (err) {
			console.error('Form not sent:', err);
			formError.textContent = 'Sorry, something went wrong. Please try again or email support@eyecheck.app.';
			formError.hidden = false;
			button.disabled = false;
			button.textContent = label;
		}
	});
});
