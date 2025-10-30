export async function fetchFileFromUrl(url, filename) {
	const res = await fetch(url);
	const blob = await res.blob();
	const file = new File([blob], filename.split("/")[1], { type: blob.type });
	console.log(file);
	return file;
}
