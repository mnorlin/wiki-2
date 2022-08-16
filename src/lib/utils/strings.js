export function length(string) {
	return Array.from(string).length;
}

export function slice(string, start, stop) {
	const strArr = Array.from(string);
	return strArr.slice(start, stop).join('');
}

export function stringToBase64(string) {
	const codeUnits = new Uint16Array(string.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = string.charCodeAt(i);
	}
	return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

export function base64ToString(base64) {
	const bytes = new Uint8Array(atob(base64).length);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = atob(base64).charCodeAt(i);
	}
	return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
