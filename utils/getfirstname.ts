export function getFirstNameFromEmail(email?: string) {
  if (!email) return "User";

  const namePart = email.split("@")[0]; // adamkorrison63555
  const cleanName = namePart.replace(/[^a-zA-Z]/g, ""); // adamkorrison
  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}
