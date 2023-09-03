export default function capitalizeFirstLetter(string) {
    if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}