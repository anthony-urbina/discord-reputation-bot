export default async function formatDate(dateString: Date) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
}
